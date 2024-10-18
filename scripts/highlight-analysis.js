hexo.extend.injector.register(
    "head_end", 
    `<script src="https://unpkg.com/highlight.run"></script>
    <script>
        H.init('1jdkoe52', {
            backendUrl: 'https://highlight-backend.cxzlw.top/public',
            environment: 'production',
            version: '...',
            networkRecording: {
                enabled: true,
                recordHeadersAndBody: true,
                urlBlocklist: [
					// insert full or partial urls that you don't want to record here
					// Out of the box, Highlight will not record these URLs (they can be safely removed):
					"https://www.googleapis.com/identitytoolkit",
					"https://securetoken.googleapis.com",
                ],
            },
        });
    </script>
    `
)