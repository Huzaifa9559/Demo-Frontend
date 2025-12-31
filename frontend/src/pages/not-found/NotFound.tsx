import { Button } from "@components";
import { useNavigation } from "@hooks";
import { useAppSelector } from "@/store";
import { ROUTE_URLS } from "@utils";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";

export const NotFound = () => {
  const { goTo, goBack } = useNavigation();
  const authState = useAppSelector((state) => state.auth);
  const { isAuthenticated = false } = authState || {};

  const handleGoHome = () => {
    if (isAuthenticated) {
      goTo(ROUTE_URLS.home);
    } else {
      goTo(ROUTE_URLS.login);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        {/* 404 Number */}
        <div className="mb-4">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
        </div>

        {/* Error Message */}
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            onClick={handleGoHome}
            className="min-w-[160px]"
          >
            {isAuthenticated ? "Go to Home" : "Go to Login"}
          </Button>
          <Button
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={goBack}
            className="min-w-[160px]"
          >
            Go Back
          </Button>
        </div>

        {/* Additional Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

