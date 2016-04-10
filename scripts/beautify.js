requirejs.config({
    baseUrl: 'scripts/',
    waitSeconds: 10
});

require([
    'config',
    'util/browser',
    'views/appview',
    'views/navview',
    'views/controlsview',
    'views/openfileview',
    'views/filterview',
    'views/adjustview',
    'views/frameview',
    'views/fullscreenview',
    'views/webcamview',
    'views/canvasview',
    'views/canvascontrolsview',
    'views/saveview',
    'views/indicatorview',
    'views/workspacenavview',
    'views/draganddropview',
    'views/workspaceview',
    'models/imagemodel',
    'models/imageprocess'
], function(
    config,
    browser,
    AppView,
    NavView,
    ControlsView,
    OpenFileView,
    FilterView,
    AdjustView,
    FrameView,
    FullscreenView,
    WebCamView,
    CanvasView,
    CanvasControlsView,
    SaveView,
    IndicatorView,
    WorkspaceNavView,
    DragAndDropView,
    WorkspaceView,
    ImageModel,
    ImageProcess
) {
    var imageModel = ImageModel();
    var appView = AppView(document.body);
    var navView = NavView(appView.el);
    var workspaceView = WorkspaceView(appView.el);
    var workspaceNavView = WorkspaceNavView(workspaceView.el);
    var canvasControlsView = CanvasControlsView(workspaceNavView.el);
    var controlsView = ControlsView(workspaceNavView.el, canvasControlsView.el, config.defaultControlParams);
    var indicatorView = IndicatorView(workspaceView.el);
    var canvasView = CanvasView(workspaceView.el, navView.el);
    var openFileView = OpenFileView(navView.el);
    var webcamView = WebCamView(navView.el);
    var adjustview = AdjustView(navView.el);
    var filterView = FilterView(navView.el);
    var frameView = FrameView(navView.el);
    var saveView = SaveView(navView.el );
    var fullscreenView = FullscreenView(workspaceView.el);
    var dragAndDropView = DragAndDropView(canvasView.el);
    var imageProcess = ImageProcess();


    function init() {
        addCSSClasses();
        addSubscribers();
    }

    function addSubscribers() {


        adjustview
            .on('updateControlView', controlsView.updateAdjustMenu);
        filterView
            .on('updateControlView', controlsView.updateFilterMenu);
        frameView
            .on('updateControlView', controlsView.updateFrameMenu);

        openFileView
            .on( 'openfile', imageModel.loadFromFile )

        imageModel
            .on( 'load', imageProcess.setimage )
            .on( 'load', openFileView.dialog.hide )
            .on( 'load', canvasView.animateToCenter )
            .on( 'load', canvasView.show )
            .on( 'load', controlsView.resetAll)
            .on( 'update', canvasView.hide )
            .on( 'error', indicatorView.showError )
            .on( 'error', indicatorView.hideLoading )
            .on( 'statusmessage', indicatorView.showMessage );

        dragAndDropView
            .on( 'drop', imageModel.loadFromFile )
            .on( 'drop', canvasView.hide );

        webcamView
            .on( 'video', imageModel.loadFromVideo );


        canvasControlsView
            .on( 'reset',controlsView.resetAll)
            .on( 'reset',imageProcess.reset)
            .on( 'confirm',canvasView.confirm)
            .on( 'confirm',controlsView.resetAll)
            .on( 'center', canvasView.animateToCenter )
            .on( 'scale', canvasView.setScale );

        canvasView
            .on( 'scale', canvasControlsView.setScale )
            .on( 'dblclick', canvasView.animateToCenter )
            .on( 'setorigin',imageProcess.setimage)
            .on( 'updateurl' , saveView.updateDownloadLink);


        imageProcess
            .on( 'updateimage' , canvasView.putImageData);

        controlsView
            .on( 'update', imageProcess.adjust)
            .on( 'filter' , imageProcess.filter)
            .on( 'framesign' , imageProcess.Addframe);

    }

    function addCSSClasses() {
        if (browser.test('touch')) {
            document.documentElement.classList.add('has-touch');
        }
    }
    init();
});
