module.exports = {
  moduleDirectories: ['node_modules', '<rootDir>','src'],
	testEnvironment: "jsdom",
	"moduleNameMapper": {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		"axios": "axios/dist/node/axios.cjs"
	},
	setupFilesAfterEnv: [
		"@testing-library/jest-dom/extend-expect"
	],
	"transform": {
		"^.+\\.[t|j]sx?$": "babel-jest"
	},
	"coveragePathIgnorePatterns": [
		"<rootDir>/src/services/",
		"<rootDir>/src/utils/http.js"
	]
}