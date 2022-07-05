const PageContainer = ({ children }: any) => {
  return (
    <div className="fixed top-16 md:top-0 md:left-60 w-full h-full md:px-4">
      {children}
    </div>
  );
};

export default PageContainer;
