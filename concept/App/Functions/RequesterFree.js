/**
 * Created by steb on 15.01.15.
 */
define({
    name: '.RequesterFree',
    calculate: function(snapshot, ou){
        switch (snapshot.requesterState){
            case 'cancel':
                return [
                    {
                        path: 'ou.vm',
                        method: 'isLoading',
                        params: [false]
                    },
                    {
                        path: 'ou.vm',
                        method: 'url',
                        params: [snapshot.loadedUrl]
                    },
                    {
                        path: 'ou.m.requester.actions',
                        method: 'free',
                        params: undefined
                    }
                ];
            case 'loaded':
                return [
                    {
                        path: 'ou.vm',
                        method: 'isLoading',
                        params: [false]
                    },
                    {
                        path: 'ou.vm',
                        method: 'data',
                        params: [ou.m.requester.params.data]
                    },
                    {
                        path: 'ou.m.urlController',
                        method: 'current',
                        params: [snapshot.loadingUrl]
                    },
                    {
                        path: 'ou.m.requester.actions',
                        method: 'free',
                        params: undefined
                    }
                ];
        }
    }
});