interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground mb-8">{description}</p>
        <div className="p-8 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground">
            此頁面正在開發中...
          </p>
        </div>
      </div>
    </div>
  );
}