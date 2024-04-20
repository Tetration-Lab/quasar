// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import {PolynomialVector, Polynomial, K} from "@tetrationlab/dilithium/Dilithium.sol";
import {IPolyVector} from "./IPolyVector.sol";

contract DilithiumPublicKeyMat3 is IPolyVector {
    using Polynomial for Polynomial.Poly;
    using PolynomialVector for PolynomialVector.PolyVecL;

    constructor() {}

    function constructMat() external pure override returns (PolynomialVector.PolyVecL memory) {
        Polynomial.Poly memory mat30 = Polynomial.Poly([int32(5793234),4603289,7021642,7464847,7142360,7831239,6300144,6389311,3593856,2028308,6309884,5912814,2387958,5345689,6530483,2653469,3244676,6289893,2945952,5386022,7114614,2338420,1850387,155980,6868805,6760267,7132380,436842,1052749,7689013,836127,5415689,5173042,3219777,3145882,7266583,1069138,1759935,6327933,4743744,1666877,2835306,3579096,1302612,4073036,5667648,1449117,1021142,5896704,1188553,7825449,1901720,4608674,5554724,5825432,6329691,5703637,4760433,3693726,2300370,1054288,7429435,7767982,1480213,2679455,1267258,1465112,2309352,7734156,1246383,2153602,6273562,4603948,6169431,376466,4692784,2476443,4204003,6185756,1489564,4304467,6951350,6116760,2867294,8173918,6284104,347966,649510,8336344,4946736,4717375,2866489,6950508,121712,2879915,3022495,4413158,7191184,2346309,7108720,6337605,4874545,2642253,7453742,4339492,4725860,6444071,3404604,2381293,2036360,6017836,5556080,915181,7318000,3256085,3605377,1700416,5018281,6406558,7180035,7975949,2949392,5168657,7146124,5697668,7021379,2761770,3731454,6839284,101259,1609205,7578229,7214092,6839263,6616208,6175926,2169166,704984,4238854,1043452,1763246,5077551,2946880,5850218,6758685,1982564,5354394,8268684,1482557,1045590,7743547,523183,79533,5671875,5866938,1911215,630163,6970797,183965,4346266,7197662,1226024,2573819,1244072,5468586,1969160,4831872,1854590,128074,3326661,5495589,2508495,1010927,6204200,4899788,3772397,6863728,4696046,5563159,488065,3882032,4211771,5344172,4608144,6230270,5912093,3630818,1802647,376922,3367466,3642184,3129397,2101602,7333328,6995203,7667703,6439442,6645844,8096655,2557609,962675,4550912,6079465,956452,5410784,4127039,1601601,6309613,2785288,60644,1731080,8137076,4147645,6232785,980830,1750753,2600521,1061730,6537144,1324412,2878662,1580885,2385270,3800268,1482922,544726,7813247,159453,5693756,6337055,4044822,5575543,2894802,5636554,2713878,4634716,2123874,2120287,7335439,1181242,6666877,4310019,1766510,1705270,2281735,3140817,3106407,3220700,47069,325446,5334776,2228919,5487736,4850461,3168485,6122272]);
        Polynomial.Poly memory mat31 = Polynomial.Poly([int32(3585568),4309973,2632211,3230781,7150159,3366427,5212210,299683,4973774,363486,5268047,3243484,2511721,8177853,2183709,6712923,2474779,2525528,6056137,4459805,7773510,710044,5464659,3871403,2848220,3462636,3626083,2721610,1772080,2418588,5774491,3102751,7118875,3598827,6552478,2564253,1703560,2050916,1978880,4226069,1445972,432169,819042,6409576,366080,7249835,1385599,7848226,6567416,2202368,6911177,3020233,1113056,8293809,169992,7184125,8123148,255888,1710889,5353003,555579,3502898,4119275,5859080,5931036,6400832,2826382,6067558,1552559,5028560,3363266,3480036,357544,4652388,7099282,1071913,7676022,823313,5262036,1868905,1580276,3543003,8330834,2404177,5996387,1185891,1665813,5835922,3216257,3594821,6471898,2404236,6115903,3937859,1645640,6975448,5206577,5824178,3196600,4774402,7181542,1246925,927971,6138955,4032455,6486444,3999522,7913429,2864672,5439020,6985339,4173910,5647802,566870,741524,5939655,5408611,609401,3072525,3273856,4729463,3086735,8140164,7281462,8046780,853909,1477762,6754271,3284565,7964747,5773389,1971689,3855394,4444502,4221013,3717461,3829123,5896209,7743801,3852432,3174714,1842919,7178908,5764937,3090991,3411911,5896106,6038823,8038973,7761700,5579780,5133061,6744878,8309088,4464538,7254105,4473500,5297271,1353546,3431439,2276024,5245907,5530008,6624786,415042,4605193,1687960,4881837,1272515,8186098,7231232,1218632,2974993,1158404,2130961,5327302,5431554,5492118,6457762,7453351,8371048,5136687,5299378,1792420,6425261,3801883,5724685,3658064,2579660,1404524,2099956,1372528,6533254,8063394,5562023,5112505,4389684,3777471,3983397,2493677,666426,2944665,5226442,2159595,72504,8073591,1052006,8194480,2172844,7805395,2289434,7060738,3606250,4281018,4565426,3868442,3443854,749776,4065828,7977257,644666,1449732,7289842,5172962,4986479,3393512,943215,2072619,7209093,3998049,3942760,8099656,3020533,4672731,348543,4780690,3268029,3261267,4702889,98231,6719871,4423399,1516930,8374627,3103828,6722624,689144,4859227,5426164,4992493,4114682,1640817,4204076,4280964,2524093,6115422]);
        Polynomial.Poly memory mat32 = Polynomial.Poly([int32(1363077),3150109,294354,316394,6977643,5495860,15410,6747301,6178086,421948,1929901,5707820,2363391,2782153,2457656,6111509,275905,8270079,4525858,6315257,5456159,3403433,3114302,4798943,2738594,6344890,5718088,7600747,2602602,224802,4557327,6318118,490816,6745471,960110,6529813,3124850,5756881,3741277,291649,7594221,4130296,992325,3969429,7418201,3898502,3232905,1026532,3133710,597832,2567396,1867715,4689825,2459144,140385,850313,7655438,5273093,6165781,7741997,2766006,3078936,7144496,188725,5050679,1864429,7249419,7941166,680742,7061526,6471363,5457569,3296156,4411895,2009543,930327,3623969,1459507,2691127,5933571,1175623,414837,7954245,8023420,6017461,6262039,1370663,1252548,118878,5543836,3225596,6299972,1840098,1408700,7712832,6409212,1507484,8269474,1606399,4186325,4068607,868535,3603647,2043924,5725562,4637375,5369071,6834557,2384227,2146589,6291011,2448639,480769,629570,6315867,1280421,5526041,5393091,849031,3013520,4844669,6860962,4638263,1136158,4860772,4899998,229018,3977383,2774746,2350077,6768966,5559128,8218864,7402850,923971,6001033,2248803,4689592,4939784,6927510,6808430,6694427,6608895,4202395,8051005,2307347,2795108,2952734,1475227,4158146,2162829,6764757,6354583,3679579,651574,2994406,8064176,2240207,2297313,295948,5234565,6773611,3830106,1302823,698540,6384588,1088161,650400,4343467,2693628,8104549,405285,7647196,6183067,4175273,7207318,4248693,4163862,6114072,8364727,5213276,3248332,2824979,1519562,6653924,5851043,8162233,3324228,1704172,6594782,384752,7387300,1942076,7759916,6240925,7046397,352814,4828042,6321304,936763,4134696,4214253,6547404,2655014,1479871,889136,793035,6365124,4021347,1311978,5452968,520642,4535661,5247701,6058962,824094,3753360,3921401,6810587,809796,3096704,4054430,4254752,3419149,7319599,6993823,2064686,225515,2785563,3006820,1389901,2916372,5438850,6948260,2860979,5105358,5052100,1802969,5212447,1484436,2871183,7181291,8314733,7161491,6586290,8369466,1819799,2161094,3623804,5963991,410708,2603734,545456,4023537,8250095,2231026]);
        Polynomial.Poly memory mat33 = Polynomial.Poly([int32(1855648),5321420,7656452,6047634,420692,6861928,5702842,4893115,3194737,2434482,2136179,1564496,5838264,786696,2505070,4601016,6140250,2116232,1402193,5551389,2372690,4867918,6762837,122273,7734784,5588764,434459,1913747,5259146,7795639,3545401,2881883,974808,3315431,4313786,5671421,100291,2146565,7764728,6514359,1778775,100079,63462,6002841,1722593,4099750,4587321,4173785,2358466,6543421,579227,4958761,3497830,834366,1233136,1152792,896413,6111458,2095805,7532723,8067400,4291334,3998191,722214,5891049,3236661,5460459,3626121,1007100,7203840,1369233,1423148,5473637,8340364,8105180,6536966,1168935,3666780,4271263,3640879,3338241,5814014,5506680,6441606,4145012,6870233,5285405,3706120,4770988,3167175,2734519,4784878,1379066,3264097,4708559,3744109,6527269,6169073,8341672,1376486,4587856,7621700,2231183,1200388,4575081,2212060,16049,1429107,2272081,2953581,4234070,1958382,6739418,1200374,4150515,6129775,2095674,3715686,3296133,92889,2140091,2928002,8209315,7130209,713235,8174849,4862177,1238351,1561207,205162,2879609,4568786,147485,7647394,1617961,6816033,4802788,1216082,7012822,4834382,3177809,8214483,3873005,8122223,2308043,8101403,5143708,7792106,6000969,7147088,224864,2062090,1830219,6151945,1964133,7717474,3940241,5071762,7306601,1432196,7622845,7266171,7751282,2874563,6740823,6502910,568221,2678670,8027536,7083059,2994404,6357403,6800659,3813290,5853714,4259533,4786611,3045614,6360964,3684065,1213725,4822025,5505821,6264520,2322930,2802342,635182,6870400,1082777,5545848,6685946,1978231,5203179,4213224,5230663,6214099,7380967,6370025,2375367,6899351,2035552,5632163,6711372,5509444,6032869,6158839,4764815,6635252,6047749,6603521,827388,525745,5420641,7486360,3228510,322986,1718214,4339412,2373674,7283309,524127,8186910,2968918,3313185,417100,4148649,4737871,2845565,2566563,1552904,3307335,968665,2239918,1946673,5369383,7800122,7981297,5727840,2949947,8085846,7142745,4725474,4970009,7358630,7434753,1008652,5338999,1881585,2290058,3519193,7635683,1926218,3084263,7584961,2498078,6839953]);
        return PolynomialVector.PolyVecL([mat30, mat31, mat32, mat33]);
    }
}