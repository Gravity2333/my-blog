# JS基础-语法相关（ECMAScript）

严格模式 在js文件 / 函数 开头引入 'use strict' 即可使用严格模式解析器

区分关键字，保留字，标识符

*   标识符可以用户自定义 比如变量 函数 参数等名称 一般采用\_字母$开头，其他字符可以是 \_ 字母 数字 $ 同时 扩展的ASCII和unicode也可以用作标识符(不建议)、
*   关键字有特殊用途，比如控制语句的开始结束等 e.g. if else break typeof..
*   保留字是未来有可能用作关键字的字符，这些字符也不可以用作标识符

变量

1.  声明变量未赋值，默认 undefined
2.  使用 var 声明的变量是局部的，在块调用结束后会删除，直接赋值的变量是全局的 message = 'hi'

数据类型： JS包含 Undefinend Null(指向空对象) Number Boolean String Object

注意 typeof undefined = 'unndefined' typeof nnull = 'object' 因为null的含义是 指向空的对象 同时需要注意 typeof是个关键字，返回的是字符串

Undefined & null

变量声明但是没有初始化会默认赋值 undefined 但是没有声明的变量，在输出的时候会报错，唯一特殊的是，对于typeof，不论是声明未初始化的变量还是未声明的变量，返回都是undefined

未初始化

未声明

运行输出

undefined

报错

typeof

undefined

undefined

能否delete

能

能

null的作用是 指向空对象 与undefined不同，null特指将来要保存对象的变量，可以在赋值的时候显式为变量赋null 但是不建议直接给变量赋值undefined。当typeof null的时候 返回 'object'我们就知道这个变量是专门用于保存对象的。

注意 undefined 继承于 null

        undefined == null true

        undefined === null false

 Boolean 6种数据类型都有相对于 true和false的映射，通过Boolean()函数完成转换，在条件判断语句中，都会调用Boolean()对非Boolean的类型进行转换，具体转换规则如下

转换为true

转换为false

Boolean

true

false

Number

 非 0 和 NAN

0和NAN

String

非空字符串

""

Null

 -

null

Undefined

 -

undefined

Object

非空对象

null

Number:

*   八进制在严格模式下不支持，赋值时需要 0开头，第二位范围在 0 -7 如果超过这个范围会(忽略第一位的0)自动转换为10进制。
*   十六进制需要0x开头，每一位的饭捏在 0-9 A-F 超过会报错
*   Number精度不足，对于不要进行小数的比较 如 0.1+0.2 != 0.3 // TODO 精度问题
*   Number的最值保存在 Number.POSITIVE\_INFINITE 和 Number.NEGATIVE\_INFINITY中，当数值不在这个范围内会返回infinite 可以使用isFinite()来判断
*   NaN: 即本来是数的返回值返回的不是数，比如 number/0 返回NaN后不会让程序终止，NaN不等于任何值，甚至不等于自己 NaN == NaN false 但是可以用isNaN来判断。
*   isNaN会先对输入进行转换，如果可以转换成数字就返回false否则转换为true，对于对象也能转换，会先调用valueof() 后判断返回值，如果不是数值在调用toString()后判断。\[调用Number()\]
*   Number类型转换有三个函数 Number() parseInt() parseFloat()
    *   Number()接受6种类型，具体转换规则如下

（1）数字类型直接返回

（2）Boolean类型 false => 0 true =>1

（3）String类型 空字符串“” => 0 字符串内能转换成数字的 (包含十进制 十六进制 小数 整数 \[0开头会忽略0\]) 转换成数字，不能的返回NaN

（4）null => 0

（5）undefined => NaN

（6）Object 先调用valueOf()方法 看你返回的值 能不能通过 1-6转换成非NaN数 若不能 调用toString() 对返回值继续判断，如果还是NaN返回NaN

*   parseInt()支持字符串转换为整数，会找到第一个非空格字符，如果该字符不是  + - 或者 数字 返回 NaN 如果是，就向后找，直到非数字字符为止 对于空字符串 返回 NaN 而不像number返回0，更加合理。parseInt支持 10 8 16 等进制数 作为第二个参数，如果不给第二个参数，默认10进制，ECMA3 对于 070这种字符串有歧义 ECMA5之后都当作10进制转换
*   parseFloat() 没有第二个参数，只支持10进制转换为小数,对于16进制 0x表示法，始终返回0

同时需要注意，parseFloat()返回结果如果没有小数点，默认转换成整数(整数占用内存小，js无时无刻偏向于把小数转换成整数)

String类型

*   string类型创建后不可以改变，string的修改是指向了新的字符串并且删除旧字符串完成的
*   六大类型中的 Number Boolean Object String都有自己对应的toString() 调用可返回该变量的字符串形式\[Number的toString()类型可以传入一个参数，表示以多少进制输出数字\]
*   对于null和undefined没有toString()函数，可以使用String()方法，对于有toString()的四大类型，直接调用toString()方法，对于null或undefined 返回字面量 'null' 或 'undefined'

运算符

单目运算符：可以对非Number类型的数值进行运算，但是前提会使用Number()对其进行转换,如果返回NaN 会直接返回NaN， e.g. var v = 'aaa' v++ 不会返回'aaa' 而会反回NaN

![](data:image/png;base64,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BQsWdHV1ubuqzps3b/Xq1Rs3bpw4ceLAwMDEiRNPPPHEEALPtWnTpksuuaSrq2vu3LmzZ89etmzZRz/6UeCpp5669dZbjzjiCPaiqrw0t95665NPPnnsscf29/dv3bp10qRJ/KqimQEioqpASglQ1c9+9rMppfPPP7+vr++hhx5aunRpCMHdBUFoNlszZ84YGBgYGmqUVdXb2ztv3ryrr7662WzMnz/fzFUkpWyGWRJxd9xRZViz0Zo0aeLGjRuWLv3pmWeeGWP0to6ODl5Iq9W64YYbpk6dOmnSpIceeqjRaIhIf3//8ccfP2XKlC9+8YtlWQJTpkw56aSTvve971188cVjx44FOjs7J02adN11123evPmcc865/vrrn3rqKRGZNWvWzJkzv/Od72zcuDGltHLlSkBVG43GGWecMXPmTNr6+vouvPBCYMuWLcuWLaNNRGKMvDh3X758+Y4dO7q7u2fPnn3XXXedddZZRVEAGzduvP32288+++y5c+c+9NBDO3bsKIpi/Pjx/EqiqrKXEMKePXvGjh173HHHzZ49u6+vD5gyZcopp5ySc04pCZKqHGtxypTJW7du3bFj15ixPfV6Z6rKe+6++5hjjhERVRxUgyrnnXdeSkkEEczIOXd21idOnDAw0G9mRx99dM45hGBt0sYodwfuu+++nTt3nn766d3d3Q8++ODJJ588fvx4M5s8eTJtv/d7v9fT0+PuQ0NDPFdvb+873/nO3t5eEVm8eHEIQUSKoli7dm1Zlu95z3t6enqAnDOQc+7p6eEXEhFV5cWJyCOPPDJx4sQZM2Z0dHQ89NBDZ5xxBjAwMPD1r3/9da973ZFHHgkcdthhy5YtU9WqqiZOnCgi7KPIc/X392/YsGH16tUnnHACow444AAR2b59++7duw+ceyBtZnbXXXc1m833X3ABbWececbKlStVERBQZdi0aVMYFRQVBfr7+wERCSG4OxBC4HlEpNls/uhHPzr55JP7+voGBwfdfc6cOQcccADg7oODg7wId6etr69PRICxY8emlNavX59Suu+++6ZPnz44ONhsNseNG7dmzZrDDjusXq/zchCRKVOmzJo1a2hoaPbs2THGZrO5cePG97znPX19fYC7AwsXLly+fPnGjRvdfcKECfPnz1dVXrLIXkSkq6urs7Nzx44du3btGj9+PG0iUlXV7t27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flWxVqu1Wq2UEm2q6m0iUlVVjFFVgVardfnll2/cuPH9/+V9vePHS5QDJky45ZabH3n40b//+7tS1iV3/GN3D8k46YT3Xfq1v3JznKpFrJMNjVQtLr/s3v/xPz7ze5/87Y9cvNjNH1+5aeHrzr5n2dVlqqGgRlSex93vuOOO1atXf/jDHwZ6e3u3bt26ZMmSmTNn9vX1PfTQQ2ZWr9fHjBkze/Zs9lKW5V133XX77bcfeeSRg4ODIjJu3Lj3vve9gIi4u4jwIrZt29bT00Pb9u3be3p6eBEiwnN96lOfEhFg1qxZH//4x4Gqqk444YQQgrvzMokppf7+/i1btsQYaRORnLOItFqtVatWzZ07t7+//5vf/Obu3bvf97739c2YQZTs1tXVffChhwap7dyxpF6MvezrSz/0oTcU0T/5yQ92dta3PLW1p7snRnImG1GIkarVRR7/L1/59oUXHg+4x4F+NSMoDjFalYaK2MMod88533zzzXfcccfZZ589efJk2g4++OCzzjrroIMOarVaIYTFixf39va6+9DQEKN27979xS9+ccKECe9///unT5++evXqG264IcY4ZcqUMWPGFEUhIrSJCCAiq1atmjdv3mGHHQa8oY22I9t4ESJiZuxFVXkud1+xYsVTTz2lqozq6ek59NBD+VXFK6+8ct26dV1dXX19fSmlEIKIqOquXbt+/OMfp5QOPfTQJ598UkQuuuiiyZMnm7miKgx74xveaAmVzuOOOeWb3/jBOWe/YUxvXrdu9eOPPdxqPjVt+hvOOPPjT6zqn9U39e3vOPWjF78l5c6x46bMfc3U73z3oWnTd5hZSlXOFDXMQXKMgb1UVXXllVdu2LDh3e9+96GHHspeFixY4O47duxoNpspJUBEdu/eXZYlbePGjXv7299++OGHqypwYNuGDRueeOKJNWvWDA0NmRl7ERFg6tSp7KNHHnkkpcQvtH379j179px77rkdHR3sZc+ePWVZ8qu55ppr7rjjjj179uSczczdq6raunXrd7/73Ztvvtndm81mVVUppZyzuzeHKjdvli1zN/Oy5XNn/dd//lL51jf97eWXPtls+tzXvOXDH/7TpXfdc+01j93w7xtWrfQb/91ec+D51/9g4JIvbzvi0P9+9Xd2HXPsJ3bsHPjKV++YN/c9Q4Oesme3yhrmTX+uwcHBPXv2+IvYsWPHPffcMzQ05G39/f333ntvWZb+Ctq+ffu6dev8F9q+ffs999xTlqU/1+Dg4L333luWpe+7eNZZZ7m7iNBWVdWaNWsefvjhiRMnLl68GNi6deu99967cOHCSZMmAfV6HBiousfU3BEwo6ibaHnxxz78uc9/5q1v/8zECYcce8zbXnfU0QiDDR58kJ27d0yfceC6JzcH6Uk+dMaZ4/7XFzr+/Yc7ujqm5yoWkWwElSC1VtnqqLG3rq4uXlxvG6N6enqOPPJIXlkHtPELHdDG83R1dR155JH8StT24u7S5u4xRjOrqqqrq0tV3V1V3T0nenqKnBGhqogFVRoIoXXmWT1Vatx6686yMqGOc8W3Hj9x8ce/8A9/t+TOW8qW797ZDEGKmmfjoxd/+Ev/dAnWWcSuVBEUc1K2eq2TX3tpooiYWQgByDnHGGfNmqWqDz300M0333zyyScfcMABp59+urvTJoo7KuAUNVLCaYWizPDxT3zoK1++pGwFvG6Zv/jM5//0f/z5288dJ84Jx97X1dmbc0YqjZx++ms+/9nGNd+/vqo8RlJFrKMhOlkI/NpLoCKiqrS5O1Cv12fMmHHMMceUZfmd73xn27Zt7p5SarVaIqLRHEQYHEziRCUWrZz3FAVnnPHajRvWDvb3QwqBWTMmbd+5uay44or7t2/f3mw2JLREBpPR2cUHPvjee1fcGYsqJ1QxwwxB+LWXRtlLCMHMgHq9PmnSpDe+8Y2HHXbYxIkTRaQoinq9nnOGMlujVVbdPdEdMyQMuO40GDOWCy98V63ezLa7Mj722+d97WufPfrIM795+eULFx6e8g4JO0R31Oq4c867jgzFNolbY52UiULODsqvvTRiZu4OqCrg7jlnEXH3EIKIAGZWVVWtVjOzEEqIVXa3QpEYSIIZhYBTJtwpChTKhBnbtjNtKp4RgUhVUdSxTBDUKTNBCJFWafW6mhGUX3spxN2BnLO7xxjZS6vVqtVqZVnW63UzU1VGtEAdsRyCiDs5MMxLVCAywnAjFLjj4E6qKGoYRLFG1YrUYggKLuREjAzLGVVE+bWXQs0MCCGIiJkxKudcr9dFJMbo7qoKpJRwrcrKcbMEuJGtCc2iZiFgTqNVhYBZI6WGSFLBzep1VMjVoFnZWcRaEVQoK3BEHbEqVSEgwq+9RJJSUlURAcwMcHczE5EYo7uLSFVVRVHwNCdVlQcvQg3DHQsVWHCxSqRWAFalUGhVSgiCmLRZRpURknIyodAggBuEqqrKWtEJyq+9NP8vVqsAhD5T3wMAAAAASUVORK5CYII=)

逻辑运算符 && || !

*   ！运算符 对于非Boolean类型的数值，会先调用Boolean()转换后取反，所以可以使用 !! 来模拟 Boolean()转换
*   && 运算符，短路操作，如果第一个操作数返回true （遵循Boolean()转换方法）则会返回第二个操作数 如果第一个操作数返回false，则不会运算第二个操作数，即便第二个操作数没有声明定义也不会报错，直接返回false

**var found = false;**

var result = (found && someUndefinedVariable); /\* someUndefinedVariable没定义 但是不会出错 \*/

alert(result); // 会执行("false")

*   || 运算符也可以进行短路操作，当第一个操作符转换后为true时，直接返回这个值，当转换为false时，返回第二个值。 所以 || 可以用来当成备用值

var found = true;

var result = (found || someUndefinedVariable); // 不会发生错误 alert(result); // 会执行("true")

双目运算符 （双目运算符会先将运算符两边的操作数使用Number()转换之后，在进行运算）

*   乘： 乘法出现NaN的情况有两种
    *   操作数中出现NaN
    *   Infinity \* 0  无穷大和无穷小无法判断其敛散性，为NaN
*   除法: 出现NaN的情况
    *   操作数中包含NaN
    *   Infinity/infinity 无穷大比阶 NaN
    *   0/0 无穷小比阶 NaN

0是个无穷小的数值 任何非0的数/0之后都是 +-Infinite 只有 0/0由于两个无穷小的数无法比较谁更小，所以是NaN，记住，NaN是无法表示的数，而对于 非0数 / 0 的情况，是可以用无穷表示的。

*     取模 NaN的情况
    *   被除数 Infinite 除数 有限 NaN
    *   被除数有限 除数 0 （无穷小） NaN
    *   被除数 除数都Infinite NaN

0%Infinite = 0  有限 / Infinite = 有限数

*   减法 NaN的情况
    *   操作数中有NaN
    *   Infinity - Infinity 或者 -Infinity + Infinity
*   加法 NaN的情况
    *   操作数出现NaN
    *   Infinity + (-Infinity) NaN
    *   如果有操作数不是数字类型 则会把两边都转换成 字符串类型【字符串，布尔，对象调用toString() null和undefined使用String()】 并且进行字符串拼接

 关系运算符

*   关系运算符比较遵循
    *   如果两边操作数都是数字 那么比较大小
    *   如果两边操作数都是字符串 按照字符串大小比较
    *   如果两边操作数不同，则先都转换为Number后比较，但是注意 NaN和任何数比较大小 都是false
    *   NaN > 1 false NaN <1 false NaN == 1 false NaN == NaN false

相等和全等 \[重要\]

*   区别在于，是否进行类型的转换
*   相等运算符 ==
    *   如果两边操作数类型相同直接比较，如果类型不同，则都转换成Number()类型进行比较  比如'false' == false 会先将Number('false')=>NaN Number(false)=>0 比较结果为 false
    *   undefined作为null的衍生，规定undefined == null 并且如果等号两边出现有null和undefined 不做转换，如果另一边不是null或者undefined 则不等 e.g. null == false 为false 因为null不转换 所以false为Boolean类型 和Null类型不等，故false
*   全等运算符 ===
    *   不做任何转换，如果类型不同直接不等 比如 '55' == 55 但是 '55' !== 55
    *   Undefined !== null 因为undefined和null的类型不同

逗号

使用逗号操作符可以在一条语句中执行多个操作，如下面的例子所示:

     var num1=1, num2=2, num3=3;

逗号操作符多用于声明多个变量;但除此之外，逗号操作符还可以用于赋值。在用于赋值时，逗号 操作符总会返回表达式中的最后一项，如下面的例子所示:

var num = (5, 1, 4, 8, 0); // num的值为0

由于 0 是表达式中的最后一项，因此 num 的值就是 0。虽然逗号的这种使用方式并不常见，但这个

例子可以帮我们理解逗号的这种行为。

Label: label需要搭配continue和break使用 为 label: statement的形式，其具体操作顺序为，先跳转到标签的位置，然后执行break或者continue操作

label:

/\*\* test label \*/

function testLabel() {

  label1: for (let i = 0; i < 10; i++) {

    for (let j = 0; j < 10; j++) {

      console.log("j循环", j);

      if (i === 3 && j === 3) {

        break label1;

      }

    }

    console.log("i循环:", i);

  }

  console.log("break循环结束");

  label2: for (let i = 0; i < 10; i++) {

    for (let j = 0; j < 10; j++) {

      console.log("j循环", j);

      if (i === 3 && j === 3) {

        continue label2;

      }

    }

    console.log("i循环", i);

  }

  console.log("continue循环结束");

}

第一个例子里，在 i,j 都等于3的时候，如果没有break label1 直接写break 那么会跳出j循环，i循环继续，而break后接参数之后，会直接先跳到label1的i循环，然后break跳出，两层循环都结束。

第二个例子里，在 I , j 都等于3的时候，如果continue不接参数，只会跳过一次j循环，而加了参数之后，会先跳到label2的开头处，然后continue，会跳过i === 3 那次循环的打印，直接到i === 4.

\[label跳转会跳到label标识的那一行\]

with作用域

可以将代码块中的作用域替换到对象中，在对象中访问变量时，会先看代码块中有没有局部的变量，如果没有则去作用域中查找

  with(window){

    console.log(location)

    console.log(window.location)

  }

}

Arguments:

*   arguments的长度和调用传入的参数个数有关，但是和定义参数个数无关
*   arguments和参数分别占用不同的内存空间，但是修改参数/arguments 会自动同步到另一个
*   箭头函数没有arguments

const testArgument = function(a,b,c){

  console.log(arguments)

  a\=10

  b\=30

  c\=40

  /\*\* 修改参数后，arguments中的值会跟着同步，但是由于arguments的个数取决于传入参数个数（2） 所以

   \* arguments中没有第三个参数，所以修改c不会同步arguments\[2\] 相反同理

   \*/

  console.log(arguments)

  arguments\[0\]=100

  arguments\[1\]=400

  arguments\[2\]=1000

  console.log(a,b,c)

}

testArgument(1,2)

arguments是伪数组。