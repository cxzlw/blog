$(
    () => {
        setTimeout(
            () => {
                NProgress.done(); 
                NProgress.start = () => {}; 
            }, 100
            ); 
    }
); 