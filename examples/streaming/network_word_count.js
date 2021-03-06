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

/**
 * Counts words in UTF8 encoded, '\n' delimited text received from the network every second.
 *
 * Usage: bin/eclairjs.sh examples/streaming/network_word_count <hostname> <port>
 * <hostname> and <port> describe the TCP server that Spark Streaming would connect to receive data.
 *
 * To run this on your local machine, you need to first run a Netcat server
 *    `$ nc -lk 9999`
 * and then run the example
 *    `$ bin/eclairjs.sh ./examples/streaming/network_word_count localhost 9999`
 */
var Duration = require('eclairjs/streaming/Duration');
var StreamingContext = require('eclairjs/streaming/StreamingContext');
var Tuple = require('eclairjs/Tuple');
var SparkConf = require(EclairJS_Globals.NAMESPACE + '/SparkConf');

var hostname = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "localhost";
var port = ((typeof args !== "undefined") && (args.length > 2)) ? 0 + args[2] : 9999;

    // Create the context with a 1 second batch size
    var StorageLevel = require('eclairjs/storage/StorageLevel');
    var conf = new SparkConf().setAppName("Javascript Network Word Count");
    var ssc = new StreamingContext(conf, new Duration(2000));



    // Create a JavaReceiverInputDStream on target ip:port and count the
    // words in input stream of \n delimited text (eg. generated by 'nc')
    // Note that no duplication in storage level only for running locally.
    // Replication necessary in distributed scenario for fault tolerance.
    var lines = ssc.socketTextStream(
            hostname, port, StorageLevel.MEMORY_AND_DISK_2);
            // "localhost", 9999, StorageLevel.MEMORY_AND_DISK_2);
    var words = lines.flatMap(function(x) {
        return x.split(/\s+/);
    });
    var wordCounts = words.mapToPair( function(s, Tuple) {
          return new Tuple(s, 1);
      }, [Tuple]).reduceByKey(function(i1,i2) {
          return i1 + i2;
      });

    wordCounts.print();
    ssc.start();
    ssc.awaitTermination();
