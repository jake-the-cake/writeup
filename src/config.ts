const APPLICATION = {
	PORT: process.env.PORT || 9999,
	f: {
		startTimer: () => new Date().getTime(),
		stopTimer: (start: number) => {
			if (start) return (APPLICATION.f.startTimer() - start) + 'ms'
		}
	}
}

export { APPLICATION }