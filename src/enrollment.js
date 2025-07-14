import { addFilter, applyFilters } from '@wordpress/hooks';

// This is the default enrollment message generator
function displayEnrollment(userId, courseId) {
	const message = applyFilters(
		'learnhooks.modifyEnrollmentMessage', // Hook name
		`User ${userId} enrolled in course ${courseId}`, // Default message
		userId,
		courseId
	);

	console.log(message);
}

// Simulate another script adding a filter to modify the message
addFilter(
	'learnhooks.modifyEnrollmentMessage',       // Hook name (same as applyFilters)
	'my-plugin/emoji-modifier',                 // Unique namespace
	(message, userId, courseId) => {
		return `${message} 🎉`;
	}
);

// Trigger the enrollment logic
displayEnrollment(101, 42);
