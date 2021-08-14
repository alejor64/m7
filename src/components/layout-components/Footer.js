import React from 'react'
import { APP_NAME } from 'configs/AppConfig';

export default function Footer() {
	return (
		<footer className="footer">
			<span>Copyright  &copy;  {`${new Date().getFullYear()}`} <span className="font-weight-semibold">{`${APP_NAME}`}</span> todos los derechos reservados.</span>
			<div>
				<a className="text-gray" href="/#" onClick={e => e.preventDefault()}>Términos y Condiciones</a>
				<span className="mx-2 text-muted"> | </span>
				<a className="text-gray" href="/#" onClick={e => e.preventDefault()}>Política de privacidad de datos</a>
			</div>
		</footer>
	)
}

