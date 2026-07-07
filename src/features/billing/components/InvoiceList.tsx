import type { Invoice } from '@features/billing/types';
import { Badge } from '@shared/ui/Badge';
import { Button } from '@shared/ui/Button';
import { Card, CardBody, CardHeader } from '@shared/ui/Card';
import { Download } from 'lucide-react';

interface InvoiceListProps {
  invoices: Invoice[];
  onDownload?: (invoiceId: string) => void;
  isLoading?: boolean;
}

export const InvoiceList = ({
  invoices,
  onDownload,
  isLoading,
}: InvoiceListProps) => {
  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      case 'refunded':
        return 'default';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
            Invoices
          </h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)] rounded w-24" />
                  <div className="h-3 bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)] rounded w-32" />
                </div>
                <div className="h-4 bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)] rounded w-16" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }

  if (invoices.length === 0) {
    return (
      <Card>
        <CardBody>
          <p className="text-center text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] py-8">
            No invoices found
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
          Invoices
        </h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-subtle)] dark:border-[var(--border-subtle)]"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[var(--text-primary)] dark:text-white text-sm">
                    {invoice.description}
                  </span>
                  <Badge variant={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </div>
                <p className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mt-1">
                  {new Date(invoice.date).toLocaleDateString()}
                  {invoice.dueDate && invoice.status === 'pending' && (
                    <span className="ml-2">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-[var(--text-primary)] dark:text-white">
                  {invoice.currency} {invoice.amount.toFixed(2)}
                </span>
                {invoice.pdfUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDownload?.(invoice.id)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
