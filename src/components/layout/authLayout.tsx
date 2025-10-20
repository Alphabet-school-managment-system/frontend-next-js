"use client";

const Index: React.FC<any> = ({ children }) => {
  return (
    <div className="flex h-screen ">
      <main
        className="flex-1 overflow-auto custom-scrollbar bg-gray-100 rounded-sm
     p-4"
      >
        {children}
      </main>
    </div>
  );
};

export default Index;
