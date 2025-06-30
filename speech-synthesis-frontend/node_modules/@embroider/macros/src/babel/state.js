"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initState = initState;
const path_1 = require("path");
const shared_internals_1 = require("@embroider/shared-internals");
const babel_import_util_1 = require("babel-import-util");
function initState(t, path, state) {
    state.importUtil = new babel_import_util_1.ImportUtil(t, path);
    state.jobs = [];
    state.removed = new Set();
    state.calledIdentifiers = new Set();
    state.packageCache = shared_internals_1.RewrittenPackageCache.shared('embroider', state.opts.appPackageRoot);
    state.sourceFile = state.opts.owningPackageRoot || (0, shared_internals_1.cleanUrl)(path.hub.file.opts.filename);
    state.pathToOurAddon = pathToAddon;
    state.owningPackage = owningPackage;
    state.originalOwningPackage = originalOwningPackage;
}
const runtimeAddonPath = (0, path_1.resolve)((0, path_1.join)(__dirname, '..', 'addon'));
function pathToAddon(moduleName) {
    if (!this.opts.owningPackageRoot) {
        // running inside embroider, so make a relative path to the module
        return (0, shared_internals_1.explicitRelative)((0, path_1.dirname)(this.sourceFile), (0, path_1.join)(runtimeAddonPath, moduleName));
    }
    else {
        // running inside a classic build, so use a classic-compatible runtime
        // specifier.
        //
        // CAUTION: the module we're pointing at here gets merged between all
        // present versions of @embroider/macros, and one will win. So if you are
        // introducing incompatible changes to its API, you need to change this name
        // (by tacking on a version number, etc) and rename the corresponding file
        // in ../addon.
        return `@embroider/macros/${moduleName}`;
    }
}
function owningPackage() {
    let pkg = this.packageCache.ownerOfFile(this.sourceFile);
    if (!pkg) {
        throw new Error(`unable to determine which npm package owns the file ${this.sourceFile}`);
    }
    return pkg;
}
function originalOwningPackage() {
    let pkg = this.owningPackage();
    return this.packageCache.original(pkg);
}
//# sourceMappingURL=state.js.map