import { useEffect, useState } from 'react';

const TrackOrderButton = ({ order, onClick }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let timer;

        if (order.status === 'OUT_FOR_DELIVERY') {
            // Check if 4 seconds have already passed since the status update
            const lastUpdate = new Date(order.updatedAt).getTime();
            const now = Date.now();
            const diff = now - lastUpdate;

            if (diff >= 4000) {
                setShow(true);
            } else {
                // Wait for the remaining time
                timer = setTimeout(() => {
                    setShow(true);
                }, 4000 - diff);
            }
        } else {
            setShow(false);
        }
        return () => clearTimeout(timer);
    }, [order.status, order.updatedAt]);

    if (!show) return <span className="text-gray-400">—</span>;

    return (
        <button
            className="hover:bg-red-500 text-white px-2 py-1 rounded text-nowrap text-[10px] bg-red-400 transition-colors"
            onClick={() => onClick(order)}
        >
            Track Order
        </button>
    );
};

export default TrackOrderButton;
