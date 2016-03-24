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
    'views/settingsview'
    // 'models/controlsmodel',
    // 'models/imagemodel',
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
    SettingsView
    // ControlsModel,
    // ImageModel,
    // GlitchModel,
    // StorageModel,
    // ShareModel,
    // NetworkModel,
    // SettingsModel,
    // LocalisationModel,
    // localforage
) {
    // var imageModel = ImageModel();
    // // var glitchModel = GlitchModel();
    // // var shareModel = ShareModel();
    // // var storageModel = StorageModel();
    // var controlsModel = ControlsModel( config.defaultControlParams );
    // // var networkModel = NetworkModel();
    // var localisationModel = LocalisationModel.sharedInstance;
    // // var settingsModel = SettingsModel();

    var appView = AppView(document.body);
    var navView = NavView(appView.el);
    var workspaceView = WorkspaceView(appView.el);
    var workspaceNavView = WorkspaceNavView(workspaceView.el);
    var canvasControlsView = CanvasControlsView(workspaceNavView.el);
    var controlsView = ControlsView(workspaceNavView.el, canvasControlsView.el, config.defaultControlParams);
    var indicatorView = IndicatorView(workspaceView.el);
    var canvasView = CanvasView(workspaceView.el, navView.el);
    var openFileView = OpenFileView(navView.el);
    var saveView = SaveView(navView.el);
    var webcamView = WebCamView(navView.el);
    // var shareView = ShareView(navView.el);
    // var aboutView = AboutView(navView.el);
    var settingsView = SettingsView(navView.el);
    var fullscreenView = FullscreenView(workspaceView.el);
    var dragAndDropView = DragAndDropView(canvasView.el);
    var welcomeView = WelcomeView();

    function init() {
        addCSSClasses();
        addSubscribers();
    }

    function addSubscribers() {}

    function addCSSClasses() {
        if (browser.test('touch')) {
            document.documentElement.classList.add('has-touch');
        }
    }
});
