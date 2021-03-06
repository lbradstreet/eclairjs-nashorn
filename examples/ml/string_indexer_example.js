/*
 * Copyright 2015 IBM Corp.
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
/*
 Usage:
 bin/eclairjs.sh examples/ml/vector_slicer_example.js"
 */

function run(sc) {


    var SQLContext = require('eclairjs/sql/SQLContext');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var StructType = require('eclairjs/sql/types/StructType');
    var DataTypes = require('eclairjs/sql/types').DataTypes;
    var StringIndexer = require('eclairjs/ml/feature/StringIndexer');


    var sqlContext = new SQLContext(sc);

   var jrdd = sc.parallelize([
      RowFactory.create(0, "a"),
      RowFactory.create(1, "b"),
      RowFactory.create(2, "c"),
      RowFactory.create(3, "a"),
      RowFactory.create(4, "a"),
      RowFactory.create(5, "c")
    ]);
    var schema = new StructType([
      DataTypes.createStructField("id", DataTypes.IntegerType, false),
      DataTypes.createStructField("category", DataTypes.StringType, false)
    ]);
    var df = sqlContext.createDataFrame(jrdd, schema);
    var indexer = new StringIndexer()
      .setInputCol("category")
      .setOutputCol("categoryIndex");
    var indexed = indexer.fit(df).transform(df);
    indexed.show();


    return indexed;

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined')  {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript StringIndexerExample");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);


    // $example off$
    sc.stop();
}
