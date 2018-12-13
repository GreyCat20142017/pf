import React from 'react';

const Footer = ({nickname, contacts}) => (
	<footer className='footer row d-flex flex-wrap justify-content-center pt-4 pb-2'>
			<p className='footer__info text-center col-12 col-md-auto'>			
				<a className='footer__contact text-secondary' href={contacts.github.link} title='Перейти в профиль на GitHub'>{nickname}</a>. 2018 год. 
			</p>	
			<p className='footer__info text-center col-12 col-md-auto'>				
		 		e-mail: <a className='footer__contact text-secondary' href={contacts.email.link} title= 'Адрес электронной почты'>{contacts.email.name}</a>			
			</p>
	</footer>	
)

export default Footer;
	