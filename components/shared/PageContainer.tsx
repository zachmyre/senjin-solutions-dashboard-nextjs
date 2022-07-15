import { PageContainer } from "../../types/Containers";

const PageContainer = ({ children }: PageContainer) => {
  return (
    <div className="flex items-center space-y-4 flex-col fixed top-16 md:items-start  md:space-y-0 md:flex-row md:top-12 md:left-60 w-full h-full md:px-4">
      {children}
    </div>
  );
};

export default PageContainer;
