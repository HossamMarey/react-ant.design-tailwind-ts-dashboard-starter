import { FC, ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const specialPaths: string[] = []

interface ScrollToTopProps {
    children?: ReactNode;
}

const ScrollToTop: FC<ScrollToTopProps> = () => {
    const location = useLocation();
    useEffect(() => {
        if (!specialPaths.includes(location.pathname))
            window.scrollTo(0, 0);
    }, [location]);

    return <> </>
};

export default ScrollToTop;