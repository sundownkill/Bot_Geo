const fs = require('fs');
const path = require('path');

const backupDir = 'D:/Projects/Bot_Geo/database/backup/day';

// Function to delete backups older than 7 days
function deleteWeeklyBackups() {
	try {
		// Get the current date
		const currentDate = new Date();

		// Get the list of backup files
		const files = fs.readdirSync(backupDir);

		// Iterate over each file
		for (const file of files) {
			// Get the full path of the file
			const filePath = path.join(backupDir, file);

			// Get the stats of the file
			const stats = fs.statSync(filePath);

			// Get the modification date of the file
			const mtime = new Date(stats.mtime);

			// Calculate the difference in days between the current date and the modification date
			const diffDays = Math.floor((currentDate - mtime) / (1000 * 60 * 60 * 24 * 30));

			// If the file is older than 7 days, delete it
			if (diffDays > 30) {
				fs.unlinkSync(filePath);
				console.log(`Deleted backup: ${filePath}`);
			}
		}
	}
	catch (error) {
		console.log('Error detected in deleteWeeklyBackups');
		throw error;
	}
}

// Schedule the deletion to run every 24 hours
module.exports = {
	deleteWeeklyBackups,
	task: true };