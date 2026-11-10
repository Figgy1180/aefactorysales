// Seasonal switch. 'holiday' turns on the Santa-hat logo, the winter banner and the
// 3-season-room homepage. Set back to 'standard' after the holidays (one line, then push).
export const SEASON: 'standard' | 'holiday' = 'holiday';
export const HOLIDAY = SEASON === 'holiday';

export const LOGO = HOLIDAY ? '/brand/ae-bee-logo-holiday.svg' : '/brand/ae-bee-logo-on-dark.svg';
export const FAVICON = HOLIDAY ? '/favicon-holiday.svg' : '/favicon.svg';
// The holiday logo is taller (room for the hat): same width, height in proportion.
export const LOGO_H = HOLIDAY ? 58 : 53;
