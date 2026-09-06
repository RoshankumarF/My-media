 
import React from "react";

function VideoCard({ video }) {

    // Convert seconds into HH:MM:SS or MM:SS
    const formatDuration = (seconds) => {
        if (!seconds) return "0:00";

        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        if (hrs > 0) {
            return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        }

        return `${mins}:${String(secs).padStart(2, "0")}`;
    };

    // Format views like 1.2K, 1.5M etc.
    const formatViews = (views) => {
        if (views < 1000) return views;

        if (views < 1000000) {
            return `${(views / 1000).toFixed(1)}K`;
        }

        if (views < 1000000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        }

        return `${(views / 1000000000).toFixed(1)}B`;
    };

    // Convert createdAt into something like "3 days ago"
    const timeAgo = (date) => {
        const seconds = Math.floor(
            (new Date() - new Date(date)) / 1000
        );

        if (seconds < 60) return "just now";

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} min ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hr ago`;

        const days = Math.floor(hours / 24);
        if (days < 30) return `${days} days ago`;

        const months = Math.floor(days / 30);
        if (months < 12) return `${months} months ago`;

        const years = Math.floor(months / 12);
        return `${years} years ago`;
    };

    return (
        <article className="group cursor-pointer">

            {/* Thumbnail */}
            <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-gray-200">

                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-300
                        group-hover:scale-105
                    "
                />

                {/* Duration */}
                <span
                    className="
                        absolute
                        bottom-2
                        right-2
                        rounded-md
                        bg-black/80
                        px-2
                        py-1
                        text-xs
                        font-semibold
                        text-white
                    "
                >
                    {formatDuration(video.duration)}
                </span>
            </div>

            {/* Video information */}
            <div className="mt-3 flex gap-3">

                {/* Owner Avatar */}
                <div className="flex-shrink-0-7">

                    {video.owner?.avatar ? (
                        <img
                            src={video.owner.avatar}
                            alt={video.owner.username}
                            className="
                                h-10
                                w-10
                                rounded-full
                                object-cover
                            "
                        />
                    ) : (
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-gray-300
                                font-semibold
                                text-gray-700
                            "
                        >
                            {video.owner?.username
                                ?.charAt(0)
                                ?.toUpperCase() || "U"}
                        </div>
                    )}

                </div>

                {/* Text information */}
                <div className="min-w-0">

                    {/* Title */}
                    <h3
                        className="
                            line-clamp-2
                            text-base
                            font-semibold
                            leading-5
                            text-gray-900
                            group-hover:text-black
                        "
                        title={video.title}
                    >
                        {video.title}
                    </h3>

                    {/* Username */}
                    <p className="mt-2 text-sm text-gray-600">
                        {video.owner?.username || "Unknown User"}
                    </p>

                    {/* Views + created date */}
                    <p className="text-sm text-gray-500">
                        {formatViews(video.views || 0)} views
                        {" • "}
                        {timeAgo(video.createdAt)}
                    </p>

                </div>

            </div>

        </article>
    );
}

export default VideoCard;
 
