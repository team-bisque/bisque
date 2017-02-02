class Tabs {
    // https://developer.chrome.com/extensions/tabs
    constructor(store, logger={}) {
        this.logger = logger;
        this.store = store;
        this.locked = false;
        this.lockedTab = null;
        this.forceActivateLockedTab = this.forceActivateLockedTab.bind(this);
        this.forceRemoveNewTab      = this.forceRemoveNewTab.bind(this);
        this.forceCreateLockTab     = this.forceCreateLockTab.bind(this);
        this.onCompleteState        = this.onCompleteState.bind(this);
    }

    // Tab functions
    setLockedTab (tab) {
        this.lockedTab = tab;
    }

    remove(tabId){
        return chromep.tabs.remove(tabId);
    }

    init(){
        // this.addEvent('onUpdated', this.onCompleteState)
    }

    onCompleteState(tabId, changeInfo){
        if (changeInfo.status === 'complete') {
            chrome.tabs.executeScript(tabId, {
                allFrames: true, 
                code: "document.body.style.backgroundColor='red'",
                runAt: 'document_idle'
            })
        }
    }

    createAndLock(){
        return chromep.tabs.create({})
            .then(()=>chromep.tabs.query({ active: true }))
            .then(res=>res[0])
            .then(tab=>this.setLockedTab(tab))
            .then(()=>this.addEvent('onActivated', this.forceActivateLockedTab))
            .then(()=>this.addEvent('onCreated', this.forceRemoveNewTab))
            .then(()=>this.addEvent('onRemoved', this.forceCreateLockTab));
    }

    // Event Emitter
    addEvent(eventType, callback){
        chrome.tabs[eventType].addListener(callback);
    }

    removeEvent(eventType, callback){
        chrome.tabs[eventType].removeListener(callback);
    }

    /* 
     * Event Callbacks
     * ==============
     */
    forceActivateLockedTab(activeInfo){
        if (activeInfo.tabId) return chromep.tabs.update(this.lockedTab.id, { active:true });
    }
    forceRemoveNewTab(tab){
        // if locked Tab exists remove newly created tab
        if(this.lockedTab && this.lockedTab.id) return this.remove(tab.id);
    }
    forceCreateLockTab(tabId, removeInfo) {
        let { getState } = this.store;
        let isWorking = getState().status.isWorking;

        if (this.lockedTab && this.lockedTab.id && tabId === this.lockedTab.id) {
            this.removeEvent('onActivated', this.forceActivateLockedTab);
            this.removeEvent('onCreated', this.forceRemoveNewTab);
            this.removeEvent('onRemoved', this.forceCreateLockTab);
            this.setLockedTab(null)
            if (!removeInfo.isWindowClosing && !isWorking) this.createAndLock();            
        }
        
    }
}

module.exports = Tabs;