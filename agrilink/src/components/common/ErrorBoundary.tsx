import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AgriLink UI Error caught by boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-stone-50 min-h-[300px] flex flex-col items-center justify-center text-center space-y-4 rounded-3xl border border-stone-200 m-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900">
              {this.props.fallbackTitle || 'Knowledge Guide Notice'}
            </h3>
            <p className="text-xs text-stone-500 mt-1 max-w-xs leading-relaxed">
              We encountered a minor display hiccup loading this agricultural section. Tap below to refresh your view.
            </p>
          </div>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              if (this.props.onReset) this.props.onReset();
            }}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Return to Library</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
