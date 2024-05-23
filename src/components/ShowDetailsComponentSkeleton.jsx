import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ShowDetailsComponentSkeleton = () => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0">
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          <Skeleton circle={true} height={50} width={50} />
        </div>
        <div className="col-md-5">
          <div className="card-body">
            <h5 className="card-title">
              <Skeleton width={100} />
            </h5>
            <p className="card-text">
              <Skeleton width={80} />
            </p>
            <p className="card-text">
              <Skeleton width={60} />
            </p>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card-body d-flex align-items-end justify-content-end">
            <Skeleton width={100} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetailsComponentSkeleton;
