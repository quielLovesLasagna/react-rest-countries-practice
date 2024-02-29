export default function Country({ country }) {
	const flag = country.flags.png;
	const flagAlt = country.flags.alt;
	const name = country.name.common;

	return (
		<div className="country">
			<img className="country__image" src={flag} alt={flagAlt} />
			<div className="country__info">
				<h1 className="country__name">{name}</h1>
			</div>
		</div>
	);
}
