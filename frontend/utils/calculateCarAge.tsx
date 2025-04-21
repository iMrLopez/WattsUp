export default 
// Helper function to calculate age
function calculateCarAge(launchDate: string): number {
  const launch = new Date(launchDate);
  const today = new Date();
  let age = today.getFullYear() - launch.getFullYear();
  const monthDiff = today.getMonth() - launch.getMonth();

  // If the current month and day are before the launch month and day, subtract one year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < launch.getDate())
  ) {
    age--;
  }

  return age;
}
