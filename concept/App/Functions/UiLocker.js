/**
 * Created by steb on 15.01.15.
 */
define({
    name: '.UiLocker',
    calculate: function (snapshot) {
        return [
            {
                path: 'ou.vm',
                method: 'url',
                params: [snapshot.loadingUrl]
            }
        ];
    }
});