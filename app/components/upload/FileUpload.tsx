'use client';

import { useState, useRef } from 'react';

interface FileUploadProps {
  onImport: (csvData: any[]) => Promise<{ success: boolean; tradesAdded: number; message: string }>;
}

export default function FileUpload({ onImport }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find((file) => file.name.endsWith('.csv'));

    if (csvFile) {
      await processFile(csvFile);
    } else {
      setMessage({ type: 'error', text: 'Please drop a CSV file' });
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setMessage({ type: 'info', text: 'Processing CSV file...' });

    try {
      // Parse the CSV file using PapaParse
      const Papa = (await import('papaparse')).default;

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          try {
            if (!results.data || results.data.length === 0) {
              setMessage({ type: 'error', text: 'No data found in CSV file' });
              setIsProcessing(false);
              return;
            }

            const result = await onImport(results.data);

            if (result.success) {
              setMessage({ type: 'success', text: result.message });
              // Reset file input
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            } else {
              setMessage({ type: 'error', text: result.message });
            }
            setIsProcessing(false);
          } catch (error) {
            console.error('Error importing trades:', error);
            setMessage({ type: 'error', text: 'Failed to import trades' });
            setIsProcessing(false);
          }
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          setMessage({ type: 'error', text: 'Failed to parse CSV file' });
          setIsProcessing(false);
        },
      });
    } catch (error) {
      console.error('Error processing file:', error);
      setMessage({ type: 'error', text: 'Failed to process CSV file' });
      setIsProcessing(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: isDragging ? '3px dashed var(--accent-blue)' : '2px dashed var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-12)',
          textAlign: 'center',
          background: isDragging ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-card)',
          transition: 'all var(--transition-base)',
          cursor: 'pointer',
        }}
        onClick={handleBrowseClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />

        {isProcessing ? (
          <>
            <div
              style={{
                fontSize: '64px',
                marginBottom: 'var(--space-4)',
                color: 'var(--accent-blue)',
              }}
            >
              <i className="fas fa-spinner fa-spin" />
            </div>
            <h3 className="heading-4" style={{ marginBottom: 'var(--space-2)' }}>
              Processing...
            </h3>
            <p className="body" style={{ color: 'var(--text-secondary)' }}>
              Importing trades from your CSV file
            </p>
          </>
        ) : (
          <>
            <div
              style={{
                fontSize: '64px',
                marginBottom: 'var(--space-4)',
                opacity: isDragging ? 1 : 0.6,
                color: 'var(--accent-blue)',
              }}
            >
              <i className="fas fa-file-csv" />
            </div>
            <h3 className="heading-4" style={{ marginBottom: 'var(--space-2)' }}>
              {isDragging ? 'Drop your file here' : 'Drag & Drop CSV File'}
            </h3>
            <p className="body" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
              or click to browse
            </p>

            <button
              style={{
                padding: 'var(--space-3) var(--space-6)',
                background: 'var(--gradient-info)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-base)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-semibold)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                transition: 'all var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              <i className="fas fa-folder-open" style={{ marginRight: 'var(--space-2)' }} />
              Browse Files
            </button>
          </>
        )}
      </div>

      {/* Message */}
      {message && (
        <div
          style={{
            marginTop: 'var(--space-6)',
            padding: 'var(--space-4)',
            background:
              message.type === 'success'
                ? 'var(--accent-green-dim)'
                : message.type === 'error'
                ? 'var(--accent-red-dim)'
                : 'rgba(59, 130, 246, 0.1)',
            border: `1px solid ${
              message.type === 'success'
                ? 'var(--accent-green)'
                : message.type === 'error'
                ? 'var(--accent-red)'
                : 'var(--accent-blue)'
            }`,
            borderRadius: 'var(--radius-base)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}
        >
          <i
            className={`fas ${
              message.type === 'success' ? 'fa-check-circle' : message.type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'
            }`}
            style={{
              fontSize: 'var(--text-xl)',
              color:
                message.type === 'success'
                  ? 'var(--accent-green)'
                  : message.type === 'error'
                  ? 'var(--accent-red)'
                  : 'var(--accent-blue)',
            }}
          />
          <p className="body" style={{ color: 'var(--text-primary)', margin: 0 }}>
            {message.text}
          </p>
        </div>
      )}

      {/* Instructions */}
      <div
        style={{
          marginTop: 'var(--space-8)',
          padding: 'var(--space-6)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <h4 className="heading-5" style={{ marginBottom: 'var(--space-4)' }}>
          <i className="fas fa-question-circle" style={{ marginRight: 'var(--space-2)', color: 'var(--accent-blue)' }} />
          How to Export from TradingView
        </h4>

        <ol
          className="body"
          style={{
            color: 'var(--text-secondary)',
            paddingLeft: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}
        >
          <li>Open TradingView and go to the Trading Panel</li>
          <li>Click on the &quot;History&quot; tab</li>
          <li>Click the export button (download icon)</li>
          <li>Save the CSV file to your computer</li>
          <li>Upload the CSV file here</li>
        </ol>

        <div
          style={{
            marginTop: 'var(--space-4)',
            padding: 'var(--space-3)',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid var(--accent-blue)',
            borderRadius: 'var(--radius-base)',
          }}
        >
          <p className="body-small" style={{ color: 'var(--text-primary)', margin: 0 }}>
            <i className="fas fa-lightbulb" style={{ marginRight: 'var(--space-2)', color: 'var(--accent-blue)' }} />
            <strong>Tip:</strong> Trades are automatically deduplicated. You can safely import the same file multiple times.
          </p>
        </div>
      </div>
    </div>
  );
}
