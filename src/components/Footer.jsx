import React from 'react';

const Footer = ({nickname, contacts}) => (
	<footer className='footer row d-flex justify-content-center flex-wrap'>
			<p className='footer__info'>
				<a className='footer__contact text-secondary' href={contacts.github.link} title='Перейти в профиль на GitHub'>{nickname}</a>, 2018.
				<span>&nbsp;&nbsp;</span> 
				<a className='footer__contact text-secondary' href={contacts.email.link} title= 'Адрес электронной почты'>{contacts.email.name}</a>
			</p>
	</footer>	
)

export default Footer;
	