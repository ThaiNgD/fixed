// 1. Container: Bao bọc bên ngoài, cung cấp padding và giới hạn chiều rộng
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-6 bg-card text-card-foreground rounded-lg border shadow-sm w-full mx-auto ${className}`}
    >
      {children}
    </div>
  );
}

// 2. Row: Tạo hàng ngang, dùng Flexbox để dàn trải các Cell bên trong
export function Row({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col md:flex-row gap-4 mb-1 last:mb-0 ${className}`}
    >
      {children}
    </div>
  );
}

// 3. Cell: Các cột nằm trong Row. Mặc định sẽ tự chia đều không gian
export function Cell({
  children,
  title = "",
  className = "",
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-1 gap-2 items-center flex-row ${className}`}>
      {title && (
        <h3 className="p-2 w-[30%] max-w-[240px] bg-gray-200 font-bold overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
