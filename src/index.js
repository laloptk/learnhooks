import { addFilter, applyFilters } from '@wordpress/hooks';

// Add a filter that modifies the enrollment message
addFilter(
	'learnhooks.modifyEnrollmentMessage',
	'my-plugin/emoji-modifier',
	(message, userId, courseId) => `${message} 🎉`
);

// Create and inject a button into the admin footer
document.addEventListener('DOMContentLoaded', () => {
	const button = document.createElement('button');
	button.textContent = 'Trigger Enrollment Message';
	button.style.cssText = 'margin:20px; padding:10px;';
	button.addEventListener('click', () => {
		const userId = 101;
		const courseId = 42;

		const message = applyFilters(
			'learnhooks.modifyEnrollmentMessage',
			`User ${userId} enrolled in course ${courseId}`,
			userId,
			courseId
		);

		console.log('[Filtered message]:', message);
	});

	document.body.appendChild(button);
});
