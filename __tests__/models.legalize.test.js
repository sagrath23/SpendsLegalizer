var greedyLegalizeDocuments = require("../models/legalize");

test("base test case", () => {
    var tickets = [3,6,2];
    var bills = [5,1,7,3];

    var expectedValue = {
        bonos: [2,3,6],
        facturas: [1,3,7]
    }

    expect(greedyLegalizeDocuments(tickets, bills)).toEqual(expectedValue);
});

test("tickets and bills are equals", () => {
    var tickets = [3,6,2];
    var bills = [3,6,2];

    var expectedValue = {
        bonos: [2,3,6],
        facturas: [2,3,6]
    }

    expect(greedyLegalizeDocuments(tickets, bills)).toEqual(expectedValue);
});

test("sum of tickets is greater than sum of bills", () => {
    var tickets = [3,6,2];
    var bills = [1,7,3];

    var expectedValue = {
        bonos: [2,3,6],
        facturas: [1,3,7]
    }

    expect(greedyLegalizeDocuments(tickets, bills)).toEqual(expectedValue);
});

test("sum of tickets only allow to legalize lower bill", () => {
    var tickets = [3,6,2];
    var bills = [12,11,15];

    var expectedValue = {
        bonos: [2,3,6],
        facturas: [11]
    }

    expect(greedyLegalizeDocuments(tickets, bills)).toEqual(expectedValue);
});
/*
test("sum of bills will be legalized by lower ticket", () => {
    var tickets = [11,8,6];
    var bills = [2,1,3];

    var expectedValue = {
        bonos: [6],
        facturas: [1,2,3]
    }

    expect(greedyLegalizeDocuments(tickets, bills)).toEqual(expectedValue);
});
*/
test("sum of tickets is lower to any bill", () => {
    var tickets = [3,6,2];
    var bills = [12,21,15];

    var expectedValue = {
        bonos: [],
        facturas: []
    }

    expect(greedyLegalizeDocuments(tickets, bills)).toEqual(expectedValue);
});

test("1k of tickets & bills random", () => {
    var tickets = [157,993,567,986,450,804,524,398,865,472
        ,495,941,325,558,221,511,500,808,850,391
        ,321,654,774,543,660,202,51,123,704,516
        ,870,620,905,954,810,722,214,56,578,563
        ,247,798,392,768,128,919,96,787,55,225
        ,631,113,953,344,585,536,301,236,836,156
        ,918,713,404,922,604,729,871,484,549,586
        ,517,867,120,635,17,785,923,376,958,20
        ,959,750,171,706,352,477,600,580,377,1
        ,284,431,975,498,878,718,592,915,245,752]
        
        var bills= [466,335,806,807,878,254,188,185,556,766
            ,822,950,678,321,694,597,221,379,544,175
            ,198,316,82,718,617,125,599,710,310,731
            ,60,857,298,762,783,709,349,459,621,708
            ,868,735,414,160,190,130,949,322,283,252
            ,646,78,819,785,697,400,496,28,15,785
            ,381,528,53,864,252,174,865,205,332,211
            ,385,366,906,98,785,915,627,146,645,33
            ,164,98,100,94,342,45,49,778,995,656
            ,66,89,306,169,269,472,154,778,234,348]
    var expectedValue = {"bonos": [1, 17, 20, 51, 55, 56, 96, 113, 120, 123, 128, 156, 157, 171, 202, 214,221, 225, 236, 245, 247, 284, 301, 321, 325, 344, 352, 376, 377, 391, 392, 398, 404, 431, 450, 472, 477, 484, 495, 498, 500, 511, 516, 517, 524, 536, 543, 549, 558, 563, 567, 578, 580, 585, 586, 592, 600, 604, 620, 631, 635, 654, 660, 704, 706, 713, 718, 722, 729, 750, 752, 768, 774, 785, 787, 798, 804, 808, 810, 836, 850, 865, 867, 870, 871, 878, 905, 915, 918, 919, 922, 923, 941, 953, 954, 958, 959, 975, 986, 993], "facturas": [15, 33, 49, 60, 78, 89, 98, 100, 130, 154, 164, 174, 185, 190, 205, 221, 252, 254, 283, 306, 316, 322, 335, 348, 366, 381, 400, 414, 466, 496, 544, 556, 599, 621, 645, 656, 694, 708, 710, 731, 762, 778, 783, 785, 785, 806, 819, 857, 865, 878, 915, 950, 995]}

    expect(greedyLegalizeDocuments(tickets, bills)).toEqual(expectedValue);
});
