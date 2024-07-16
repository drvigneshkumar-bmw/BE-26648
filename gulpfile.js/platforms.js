const gulp = require('gulp');
replace = require('gulp-replace');
fs = require('fs');
rename = require('gulp-rename');
cheerio = require('gulp-cheerio');

const mailchimp = () => {
	fs.readdir('source', (err, list) => {
		list = list.filter((item) => !/(^|\/)\.[^\/\.]/g.test(item));
		list.forEach((item) => {
			gulp
				.src(`dist/${item}/HTML/index.html`)
				.pipe(replace('VIEWONLINE-UPDATE', '*|ARCHIVE|*'))
				.pipe(replace('UNSUBSCRIBE-UPDATE', '*|UNSUB|*'))
				.pipe(replace('[First Name]', '*|FNAME|*'))
				.pipe(replace('[First name]', '*|FNAME|*'))
				.pipe(replace('[first name]', '*|FNAME|*'))
				.pipe(replace('[Last name]', '*|LNAME|*'))
				.pipe(rename('index-mailchimp.html'))
				.pipe(gulp.dest(`dist/${item}/Mailchimp/`));
		});
		list.forEach((item) => {
			gulp
				.src(`dist/${item}/HTML/images/*`)
				.pipe(gulp.dest(`dist/${item}/Mailchimp/images/`));
		});
	});
};

const cm = () => {
	fs.readdir('source', (err, list) => {
		list = list.filter((item) => !/(^|\/)\.[^\/\.]/g.test(item));
		list.forEach((item) => {
			gulp
				.src(`dist/${item}/HTML/index.html`)
				.pipe(
					cheerio(function ($) {
						$('#view-online > a').remove();
						$('#view-online').append('<webversion>View online</webversion>');
						$('#unsubscribe > a').remove();
						$('#unsubscribe').append('<unsubscribe>unsubscribe</unsubscribe>');
					})
				)
				.pipe(replace('[First Name]', '[firstname]'))
				.pipe(replace('[First name]', '[firstname]'))
				.pipe(replace('[first name]', '[firstname]'))
				.pipe(replace('[Last name]', '[lastname]'))
				.pipe(replace('&apos;', "'"))
				.pipe(rename('index-campaignmonitor.html'))
				.pipe(gulp.dest(`dist/${item}/CampaignMonitor/`));
		});
		list.forEach((item) => {
			gulp
				.src(`dist/${item}/HTML/images/*`)
				.pipe(gulp.dest(`dist/${item}/CampaignMonitor/images/`));
		});
	});
};

const dm = () => {
	fs.readdir('source', (err, list) => {
		list = list.filter((item) => !/(^|\/)\.[^\/\.]/g.test(item));
		list.forEach((item) => {
			gulp
				.src(`dist/${item}/HTML/index.html`)
				.pipe(replace('VIEWONLINE-UPDATE', 'https://$CANTREAD$'))
				.pipe(replace('UNSUBSCRIBE-UPDATE', 'https://$UNSUB$'))
				.pipe(replace('[First Name]', '@FIRSTNAME@'))
				.pipe(replace('[First name]', '@FIRSTNAME@'))
				.pipe(replace('[first name]', '@FIRSTNAME@'))
				.pipe(replace('[Last name]', '@LASTNAME@'))
				.pipe(rename('index-dotmailer.html'))
				.pipe(gulp.dest(`dist/${item}/DotMailer/`));
		});
		list.forEach((item) => {
			gulp
				.src(`dist/${item}/HTML/images/*`)
				.pipe(gulp.dest(`dist/${item}/DotMailer/images/`));
		});
	});
};

const drive = () => {
	fs.readdir('source', (err, list) => {
		list = list.filter((item) => !/(^|\/)\.[^\/\.]/g.test(item));
		list.forEach((item) => {
			gulp
				.src(`dist/${item}/HTML/index.html`)
				.pipe(replace('UNSUBSCRIBE-UPDATE', '{{EA_URLUNSUBSCRIBE}}'))
				.pipe(replace('[First Name]', '{{CM_cntct_FIRSTNAM}}'))
				.pipe(replace('[First name]', '{{CM_cntct_FIRSTNAM}}'))
				.pipe(replace('[first name]', '{{CM_cntct_FIRSTNAM}}'))
				.pipe(replace('[Last name]', '{{CM_cntct_SURNAME}}'))
				.pipe(rename('index-drive.html'))
				.pipe(gulp.dest(`dist/${item}/Drive/`));
		});
		list.forEach((item) => {
			gulp
				.src(`dist/${item}/HTML/images/*`)
				.pipe(gulp.dest(`dist/${item}/Drive/images/`));
		});
	});
};

const force24 = () => {
	fs.readdir('source', (err, list) => {
		list = list.filter((item) => !/(^|\/)\.[^\/\.]/g.test(item));
		list.forEach((item) => {
			gulp
				.src(`dist/${item}/HTML/index.html`)
				.pipe(
					cheerio(function ($) {
						$('#unsubscribe > a').remove();
						$('#unsubscribe').append('<unsubscribe>unsubscribe</unsubscribe>');
					})
				)
				.pipe(replace('VIEWONLINE-UPDATE', '[nonTrackingLink]'))
				.pipe(
					replace(
						'[First Name]',
						'<f24-token value="contact.field(firstname)" null-value-behaviour="default" default-value="Customer" contenteditable="false">[First Name]</f24-token>'
					)
				)
				.pipe(
					replace(
						'[First name]',
						'<f24-token value="contact.field(firstname)" null-value-behaviour="default" default-value="Customer" contenteditable="false">[First Name]</f24-token>'
					)
				)
				.pipe(
					replace(
						'[first name]',
						'<f24-token value="contact.field(firstname)" null-value-behaviour="default" default-value="Customer" contenteditable="false">[First Name]</f24-token>'
					)
				)
				.pipe(replace('&apos;', "'"))
				.pipe(rename('template.html'))
				.pipe(gulp.dest(`dist/${item}/Force24/`));
		});
		list.forEach((item) => {
			gulp
				.src(`dist/${item}/HTML/images/*`)
				.pipe(gulp.dest(`dist/${item}/Force24/images/`));
		});
	});
};

const platforms = () => {
	mailchimp();
	dm();
	cm();
	drive();
	force24();
};

module.exports = platforms;
