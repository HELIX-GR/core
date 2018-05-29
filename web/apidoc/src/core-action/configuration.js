/**
 * @api {get} action/configuration/{locale} Load configuration
 * @apiVersion 1.0.0
 * @apiName Load
 * @apiGroup Configuration
 *
 * @apiDescription Loads application configuration settings
 *
 * @apiParam (Path Parameters)            {String}    locale            The locale used for translating resources
 *
 * @apiParamExample {json} Request Example
 * GET action/configuration/en-GB
 *
 * @apiSuccess                            {Boolean}   success           Returns <code>true</code> or <code>false</code>
 * indicating success of the operation.
 * @apiSuccess                            {Object[]}  errors            Array of <code>Error</code> objects
 * @apiSuccess                            {Object}    result            An instance of <code>Configuration</code>. If the value of
 * property <code>success</code> is <code>false</code>, <code>result</code> is <code>undefined</code>
 *
 * @apiSuccess (Configuration)            {Object}    bingMaps                Bing Maps configuration options
 * @apiSuccess (Configuration)            {Object}    osm                     Open Street Maps configuration options
 * @apiSuccess (Configuration)            {String}    defaultIdentityProvider Default Identity Provider
 *
 * @apiSuccess (Bing Maps)      {String}  applicationKey    Bing Maps application key
 * @apiSuccess (Bing Maps)      {String}  imagerySet        Imagery set e.g. <code>Road</code>
 *
 * @apiSuccess (OSM)            {String}  url               Open Street Maps tile server URL template
 *
 * @apiSuccessExample {json} Response Example
 * HTTP/1.1 200 OK
 * {
 *   "errors": [],
 *   "success": true,
 *   "result": {
 *     "bingMaps": {
 *       "applicationKey": "",
 *       "imagerySet": "Road"
 *     },
 *     "defaultIdentityProvider": null,
 *     "osm": {
 *       "url": ""
 *     }
 *   }
 * }
 *
 * @apiError                              {Boolean}   success           Always <code>false</code>.
 * @apiError                              {Object[]}  errors            Array of <code>Error</code> objects.
 *
 * @apiError (Error)                      {String} code                 Unique error code.
 * @apiError (Error)                      {String} description          Error message
 *
 * @apiErrorExample Error Response Example
 * HTTP/1.1 200 OK
 * {
 *   errors: [{
 *     code: "BasicErrorCode.NOT_IMPLEMENTED",
 *     description: "Not implemented"
 *   }],
 *   success: false
 * }
 *
 */
function load() { return; }
