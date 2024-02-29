export default function Search({ query, setQuery }) {
	function handleOnChange(e) {
		setQuery(e.target.value);
	}

	return (
		<div className="search">
			<input
				className="search__input"
				placeholder="Search country..."
				value={query}
				onChange={(e) => handleOnChange(e)}
			/>
		</div>
	);
}
