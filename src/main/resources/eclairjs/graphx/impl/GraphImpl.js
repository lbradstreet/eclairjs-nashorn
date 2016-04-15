/*
 * Copyright 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    var Graph = require(EclairJS_Globals.NAMESPACE + '/graphx/Graph');
    /**
     * @memberof module:eclairjs/graphx/impl
     * @constructor
     */
    var GraphImpl = function (jvmObject) {
        this.logger = Logger.getLogger("GraphImpl_js");
        Graph.call(this, jvmObject);

    };

    GraphImpl.prototype = Object.create(Graph.prototype);

    GraphImpl.prototype.constructor = GraphImpl;

    module.exports = GraphImpl;


})();
