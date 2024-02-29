export default function Filter({ className, onClick, children }) {
	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
}
