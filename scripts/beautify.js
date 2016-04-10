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
    // 'views/shareview',
    'views/indicatorview',
    'views/workspacenavview',
    // 'views/aboutview',
    'views/draganddropview',
    'views/workspaceview',
    'views/welcomeview',
    'views/settingsview',
    'models/imagemodel',
    'models/imageprocess'
    // 'models/glitchmodel',
    // 'models/storagemodel',
    // 'models/sharemodel',
    // 'models/networkmodel',
    // 'models/settingsmodel',
    // 'models/localisationmodel',
    // 'lib/localforage.nopromises'
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
    // ShareView,
    IndicatorView,
    WorkspaceNavView,
    // AboutView,
    DragAndDropView,
    WorkspaceView,
    WelcomeView,
    SettingsView,
    ImageModel,
    ImageProcess
    // GlitchModel,
    // StorageModel,
    // ShareModel,
    // NetworkModel,
    // SettingsModel,
    // LocalisationModel,
    // localforage
) {
    var imageModel = ImageModel();
    // var glitchModel = GlitchModel();
    // var shareModel = ShareModel();
    // var storageModel = StorageModel();
    //var controlsModel = ControlsModel( config.defaultControlParams );
    // var networkModel = NetworkModel();
    // var localisationModel = LocalisationModel.sharedInstance;
    // var settingsModel = SettingsModel();

    var appView = AppView(document.body);
    var navView = NavView(appView.el);
    var workspaceView = WorkspaceView(appView.el);
    var workspaceNavView = WorkspaceNavView(workspaceView.el);
    var canvasControlsView = CanvasControlsView(workspaceNavView.el);
    var controlsView = ControlsView(workspaceNavView.el, canvasControlsView.el, config.defaultControlParams);
    var indicatorView = IndicatorView(workspaceView.el);
    var canvasView = CanvasView(workspaceView.el, navView.el);
    var openFileView = OpenFileView(navView.el);
    var adjustview = AdjustView(navView.el);
    var filterView = FilterView(navView.el);
    var frameView = FrameView(navView.el);
    var saveView = SaveView(navView.el );
    var webcamView = WebCamView(navView.el);
    // var shareView = ShareView(navView.el);
    // var aboutView = AboutView(navView.el);
    var settingsView = SettingsView(navView.el);
    var fullscreenView = FullscreenView(workspaceView.el);
    var dragAndDropView = DragAndDropView(canvasView.el);
    var welcomeView = WelcomeView();
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
            .on( 'filter' , imageProcess.filter);

    }

    function addCSSClasses() {
        if (browser.test('touch')) {
            document.documentElement.classList.add('has-touch');
        }
    }
    init();
});
