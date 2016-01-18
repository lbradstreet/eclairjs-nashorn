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
 * The example requires a mySQL database eclairjstesting with a people table
 * the JDBC drivers must be added to the java class path
 */

var sparkContext = new SparkContext("local[*]", "dataframe");
var sqlContext = new SQLContext(sparkContext);
var url="jdbc:mysql://localhost:3306/eclairjstesting";
var prop = {};
prop["user"] = "root";
prop["password"] = "eclairjstestPW";
var peopleDF = sqlContext.read().jdbc(url, "people", prop);
peopleDF.show();
var peopleDF = sqlContext.read().jdbc(url, "people", ["age > 20"], prop);
peopleDF.show();

//scala> val males = sqlContext.read.jdbc(url,"person",Array("gender='M'"),prop)