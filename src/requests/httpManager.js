const { default: axios } = require('axios');
const RateLimit = require('../action/RateLimit');
const JSONError = require('../error/JSONError');
const RequestError = require('../error/RequestError');
const GocheInfo = require('../GocheInfo');
const GocheLibrary = require('../GocheLibrary');

/**
 * ### httpManager
 * This solicitor was discontinued due to the use of excessive memory. Using the Javascript's native library it seems that there was less memory consumption.
 * @deprecated 
 * @version 0.0.2
 * @class HttpAPI Use this class to make requests from now on.
 */
module.exports = class httpManager {
	constructor(gocheLibrary = new GocheLibrary()) {
		this.gocheLibrary = gocheLibrary;
		this.ratelimit = new RateLimit(this.gocheLibrary.requestConfigBuilder, this.gocheLibrary);
	}
	async otherRequest(method, path, response, data) {
	
		switch (method) {
			case 'delete':
				return axios
					.delete(
						`https://discord.com/api/v${GocheInfo.DISCORD_API}/${path}`,
						{
							method: method,
							headers: {
								Authorization: `Bot ${this.gocheLibrary.token}`,
								'User-Agent':
									'Discord Bot (Goche, 0.0.1)',
								'Content-Type':
									'application/json',
								'X-RateLimit-Precision':
									'millisecond',
							},
							data: data,
						}
					)
					.then((res) => {
	
						if (
							res.status ===
							429
						) {
							this.ratelimit.addQueue(
								new RateLimitBlock(
									this.otherRequest(
										method,
										path,
										response,
										data
									)
								)
							);
							this
								.gocheLibrary
								.gocheClient
								.heartbeart
								.ratelimit++;
							response({
								error: true,
								errorInfo:
									RequestError[
										res
											.status
									],
								ratelimit: true,
							});
							return {
								type:
									'http',
								error: true,
								errorInfo:
									RequestError[
										res
											.status
									],
								ratelimit: true,
							};
						}
						if (
							res.status <
							205
						) {
							response(
								res.data
							);
						} else {
							if (
								typeof res
									.data
									.code ===
								'number'
							) {
								response(
									{
										type:
											'http/jsonerror/statuscode',
										error: true,
										errorInfo:
											JSONError[
												res
													.data
													.code
											],
										ratelimit: true,
									}
								);
							} else {
								response(
									{
										type:
											'http/statuscode',
										error: true,
										errorInfo:
											res.status,
										ratelimit: true,
									}
								);
							}
							return {
								type:
									'http/status',
								error: true,
								errorInfo:
									JSONError[
										res
											.data
											.code
									],
								ratelimit: true,
							};
						}
						// this.gocheLibrary.gocheClient.heartbeart.requests++
					})
					.catch((resError) => {
						if (
							resError.status ===
							200
						) {
							/**
							 * No code ...
							 */
						} else {
				
						
							if (
								typeof resError.response ===
								'object'
							) {
								if (
									typeof resError
										.response
										.data ===
									'object'
								) {
									if (resError.response.status === 429) {
										/**
										 * RATE LIMIT
										 */
										this.ratelimit.addQueue('delete', resError.response.data.retry_after, method, path, response, data)
		
										return
									}
									response(
										{
											type:
												'http-external',
											error: true,
											errorInfo:
												JSONError[
													resError
														.response
														.data
														.code
												],
										}
									);
								}
							} else {
								response(
									{
										type:
											'http-external',
										error: true,
										errorInfo: resError,
									}
								);
							}
						}
					});
				break;
			case 'patch':
				return axios
					.patch(
						`https://discord.com/api/v${GocheInfo.DISCORD_API}/${path}`,
						data,
						{
							headers: {
								Authorization: `Bot ${this.gocheLibrary.token}`,
								'User-Agent':
									'Discord Bot (https://github.com/NavyCake/Goche, 0.0.1)',
								'Content-Type':
									'application/json',
								'X-RateLimit-Precision':
									'millisecond',
							},
						}
					)
					.then((res) => {
						if (
							res.status ===
							429
						) {
							
							this
								.gocheLibrary
								.gocheClient
								.heartbeart
								.ratelimit++;
							response({
								error: true,
								errorInfo:
									RequestError[
										res
											.status
									],
								ratelimit: true,
							});
							return {
								type:
									'http',
								error: true,
								errorInfo:
									RequestError[
										res
											.status
									],
								ratelimit: true,
							};
						}
						if (
							res.status <
							205
						) {
							response(
								res.data
							);
						} else {
							if (
								typeof res
									.data
									.code ===
								'number'
							) {
								response(
									{
										type:
											'http/jsonerror/statuscode',
										error: true,
										errorInfo:
											JSONError[
												res
													.data
													.code
											],
										ratelimit: true,
									}
								);
							} else {
								response(
									{
										type:
											'http/statuscode',
										error: true,
										errorInfo:
											res.status,
										ratelimit: true,
									}
								);
							}
							return {
								type:
									'http/status',
								error: true,
								errorInfo:
									JSONError[
										res
											.data
											.code
									],
								ratelimit: true,
							};
						}
						// this.gocheLibrary.gocheClient.heartbeart.requests++
					})
					.catch((resError) => {
						if (
							resError.status ===
							200
						) {
							/**
							 * No code ...
							 */
						} else {
				
						
							if (
								typeof resError.response ===
								'object'
							) {
								if (
									typeof resError
										.response
										.data ===
									'object'
								) {
									if (resError.response.status === 429) {
										/**
										 * RATE LIMIT
										 */
										this.ratelimit.addQueue('patch', resError.response.data.retry_after, method, path, response, data)
		
										return
									}
									response(
										{
											type:
												'http-external',
											error: true,
											errorInfo:
												JSONError[
													resError
														.response
														.data
														.code
												],
										}
									);
								}
							} else {
								response(
									{
										type:
											'http-external',
										error: true,
										errorInfo: resError,
									}
								);
							}
						}
					});
				break;
			case 'put':
				return axios
					.put(
						`https://discord.com/api/v${GocheInfo.DISCORD_API}/${path}`,
						data,
						{
							headers: {
								Authorization: `Bot ${this.gocheLibrary.token}`,
								'User-Agent':
									'Discord Bot (https://github.com/NavyCake/Goche, 0.0.1)',
								'Content-Type':
									'application/json',
								'X-RateLimit-Precision':
									'millisecond',
							},
						}
					)
					.then((res) => {
			
						if (
							res.status ===
							429
						) {
							this.ratelimit.addQueue('put', resError.response.data.retry_after, method, path, response, data)
	
							this
								.gocheLibrary
								.gocheClient
								.heartbeart
								.ratelimit++;
							response({
								error: true,
								errorInfo:
									RequestError[
										res
											.status
									],
								ratelimit: true,
							});
							return {
								type:
									'http',
								error: true,
								errorInfo:
									RequestError[
										res
											.status
									],
								ratelimit: true,
							};
						}
						if (
							res.status <
							205
						) {
							response(
								res.data
							);
						} else {
							if (
								typeof res
									.data
									.code ===
								'number'
							) {
								response(
									{
										type:
											'http/jsonerror/statuscode',
										error: true,
										errorInfo:
											JSONError[
												res
													.data
													.code
											],
										ratelimit: true,
									}
								);
							} else {
								response(
									{
										type:
											'http/statuscode',
										error: true,
										errorInfo:
											res.status,
										ratelimit: true,
									}
								);
							}
							return {
								type:
									'http/status',
								error: true,
								errorInfo:
									JSONError[
										res
											.data
											.code
									],
								ratelimit: true,
							};
						}
						// this.gocheLibrary.gocheClient.heartbeart.requests++
					})
					.catch((resError) => {
						if (
							resError.status ===
							200
						) {
							/**
							 * No code ...
							 */
						} else {
				
						
							if (
								typeof resError.response ===
								'object'
							) {
								if (
									typeof resError
										.response
										.data ===
									'object'
								) {
									if (resError.response.status === 429) {
										/**
										 * RATE LIMIT
										 */
										this.ratelimit.addQueue('put', resError.response.data.retry_after, method, path, response, data)
		
										return
									}
									response(
										{
											type:
												'http-external',
											error: true,
											errorInfo:
												JSONError[
													resError
														.response
														.data
														.code
												],
										}
									);
								}
							} else {
								response(
									{
										type:
											'http-external',
										error: true,
										errorInfo: resError,
									}
								);
							}
						}
					});
				break;
			default:
				return axios[method](
					`https://discord.com/api/v${GocheInfo.DISCORD_API}/${path}`,
					{
						method: method,
						headers: {
							Authorization: `Bot ${this.gocheLibrary.token}`,
							'User-Agent':
								'Discord Bot (https://github.com/NavyCake/Goche, 0.0.1)',
							'Content-Type':
								'application/json',
							'X-RateLimit-Precision':
								'millisecond',
						},
					},
					data
				)
					.then((res) => {
						if (
							res.status ===
							429
						) {
							this.ratelimit.addQueue(
								new RateLimitBlock(
									this.otherRequest(
										method,
										path,
										response,
										data
									)
								)
							);
							this
								.gocheLibrary
								.gocheClient
								.heartbeart
								.ratelimit++;
							response({
								error: true,
								errorInfo:
									RequestError[
										res
											.status
									],
								ratelimit: true,
							});
							return {
								type:
									'http',
								error: true,
								errorInfo:
									RequestError[
										res
											.status
									],
								ratelimit: true,
							};
						}
						if (
							res.status <
							205
						) {
							response(
								res.data
							);
						} else {
							if (
								typeof res
									.data
									.code ===
								'number'
							) {
								response(
									{
										type:
											'http/jsonerror/statuscode',
										error: true,
										errorInfo:
											JSONError[
												res
													.data
													.code
											],
										ratelimit: true,
									}
								);
							} else {
								response(
									{
										type:
											'http/statuscode',
										error: true,
										errorInfo:
											res.status,
										ratelimit: true,
									}
								);
							}
							return {
								type:
									'http/status',
								error: true,
								errorInfo:
									JSONError[
										res
											.data
											.code
									],
								ratelimit: true,
							};
						}
						// this.gocheLibrary.gocheClient.heartbeart.requests++
					})
					.catch((resError) => {
						if (
							resError.status ===
							200
						) {
							/**
							 * No code ...
							 */
						} else {
				
						
							if (
								typeof resError.response ===
								'object'
							) {
								if (
									typeof resError
										.response
										.data ===
									'object'
								) {
									if (resError.response.status === 429) {
										/**
										 * RATE LIMIT
										 */
										this.ratelimit.addQueue(method, resError.response.data.retry_after, method, path, response, data)
		
										return
									}
									response(
										{
											type:
												'http-external',
											error: true,
											errorInfo:
												JSONError[
													resError
														.response
														.data
														.code
												],
										}
									);
								}
							} else {
								response(
									{
										type:
											'http-external',
										error: true,
										errorInfo: resError,
									}
								);
							}
						}
					});
		}
	}
	async postRequest(path, response, data) {


		return axios
			.post(
				`https://discord.com/api/v${GocheInfo.DISCORD_API}/${path}`,
				data,
				
				{
					headers: {
						Authorization: `Bot ${this.gocheLibrary.token}`,
						'User-Agent':
							'Discord Bot (https://github.com/NavyCake/Goche, 0.0.1)',
						'Content-Type':
							'application/json',
						'X-RateLimit-Precision':
							'millisecond',
					},
				}
			)
			.then((res) => {
		
				if (res.status === 429) {
				
					this.ratelimit.addQueue('post', resError.response.data.retry_after, path, response, data)
					this.gocheLibrary.gocheClient
						.heartbeart
						.ratelimit++;
					response({
						error: true,
						errorInfo:
							RequestError[
								res
									.status
							],
						ratelimit: true,
					});
					return {
						type: 'http',
						error: true,
						errorInfo:
							RequestError[
								res
									.status
							],
						ratelimit: true,
					};
				}
				if (res.status < 205) {
					response(res.data);
				} else {
					if (
						typeof res.data
							.code ===
						'number'
					) {
						response({
							type:
								'http/jsonerror/statuscode',
							error: true,
							errorInfo:
								JSONError[
									res
										.data
										.code
								],
							ratelimit: true,
						});
					} else {
						response({
							type:
								'http/statuscode',
							error: true,
							errorInfo:
								res.status,
							ratelimit: true,
						});
					}
					return {
						type: 'http/status',
						error: true,
						errorInfo:
							JSONError[
								res
									.data
									.code
							],
						ratelimit: true,
					};
				}
				return res.data
			})
			.catch((resError) => {
					if (resError.isAxiosError === true) {
						if (typeof resError.data === 'object') {
							if (resError.data.message === '404: Not Found') {
								response({
									type:
										'http/jsonerror/statuscode',
									error: true,
									errorInfo:
										JSONError[
											resError
												.data
												.code
										],
									ratelimit: true,
								});
								return
							}
						}
						
						
					}
					
				if (typeof resError.response === 'object') {
					if (resError.response.status === 429) {
						/**
						 * RATE LIMIT
						 */
						
						 this.ratelimit.addQueue('post', resError.response.data.retry_after, path, response, data)
						 return
					} else {
						if (resError.status === 200) {
							/**
							 * No code ...
							 */
						} else {
						
							if (
								typeof resError.response ===
								'object'
							) {
								if (
									typeof resError
										.response
										.data ===
									'object'
								) {
									if (typeof response === 'function') {
										response({
											type:
												'http-external',
											error: true,
											errorInfo: 'fail',
										});
									}
								}
							} else {
								response({
									type:
										'http-external',
									error: true,
									errorInfo: resError,
								});
							}
						}
					}
				} else {
					response({
						type:
							'http-external',
						error: true,
						errorInfo: resError,
					});
				}
	
				
			});
	}

	async getRequest(path, response, data) {
		return axios
			.get(
				`https://discord.com/api/v${GocheInfo.DISCORD_API}/${path}`,
				{
					headers: {
						Authorization: `Bot ${this.gocheLibrary.token}`,
						'User-Agent':
							'Discord Bot (https://github.com/NavyCake/Goche, 0.0.1)',
						'Content-Type':
							'application/json',
						'X-RateLimit-Precision':
							'millisecond',
					},
				}
			)
			.then((res) => {
				if (res.status === 429) {
					this.ratelimit.addQueue(
						new RateLimitBlock(
							this.postRequest(
								path,
								response,
								data
							)
						)
					);
					this.gocheLibrary.gocheClient
						.heartbeart
						.ratelimit++;
					response({
						error: true,
						errorInfo:
							RequestError[
								res
									.status
							],
						ratelimit: true,
					});
					th;
					return {
						type: 'http',
						error: true,
						errorInfo:
							RequestError[
								res
									.status
							],
						ratelimit: true,
					};
				}
				if (res.status < 205) {
					response(res.data);
				} else {
					if (
						typeof res.data
							.code ===
						'number'
					) {
						response({
							type:
								'http/jsonerror/statuscode',
							error: true,
							errorInfo:
								JSONError[
									res
										.data
										.code
								],
							ratelimit: true,
						});
					} else {
						response({
							type:
								'http/statuscode',
							error: true,
							errorInfo:
								res.status,
							ratelimit: true,
						});
					}
					return {
						type: 'http/status',
						error: true,
						errorInfo:
							JSONError[
								res
									.data
									.code
							],
						ratelimit: true,
					};
				}
				// this.gocheLibrary.gocheClient.heartbeart.requests++
			})
			.catch((resError) => {
				
				if (resError.status === 200) {
					/**
					 * No code ...
					 */
				} else {
					if (resError.response.status === 429) {
						/**
						 * RATE LIMIT
						 */
						 this.ratelimit.addQueue('get', resError.response.data.retry_after, path, response, data)
					}
					if (
						typeof resError.response ===
						'object'
					) {
						if (
							typeof resError
								.response
								.data ===
							'object'
						) {
							response({
								type:
									'http-external',
								error: true,
								errorInfo:
									JSONError[
										resError
											.response
											.data
											.code
									],
							});
						}
					} else {
						response({
							type:
								'http-external',
							error: true,
							errorInfo: resError,
						});
					}
				}
			});
	}
};
