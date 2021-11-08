export const mockDB = [
    {
        title: "Classfifcation1",
        key: "0",
        children: [
            {
                title: 'Algorithm',
                key: '0-0',
                children: [
                    {
                        title: 'Merge Sort Algorithm',
                        key: '0-0-0',
                        children: [
                            {
                                title: 'Implementations',
                                key: '0-0-0-0',
                                children: [
                                    {
                                        title: 'Java',
                                        key: '0-0-0-0-0',
                                    },
                                    {
                                        title: 'C',
                                        key: '0-0-0-0-1',
                                    },

                                ]
                            },
                            {
                                title: "Problem Instances",
                                key: '0-0-0-1',
                                children: [
                                    {
                                        title: "Instance 1",
                                        key: '0-0-0-1-0',
                                    },
                                    {
                                        title: "Instance 2",
                                        key: '0-0-0-1-1',
                                    }
                                ]
                            }
                        ],
                    },
                    {
                        title: 'Quick Sort Algorithm',
                        key: '0-0-1',
                        children: [
                            {
                                title: 'Implementations',
                                key: '0-0-1-0',
                                children: [

                                    { title: 'Java', key: '0-0-1-0-0' },
                                    { title: 'C', key: '0-0-1-0-1' },
                                ]
                            },
                        ],
                    },
                ]
            },
        ]
    },
]

export const BENCH_MARKS = [
    {
        title: 'Benchmarks',
        key: '0-0-0-0-0-0',
        children: [
            {
                title: 'CPU',
                key: '0-0-0-0-0-0-0',
                children: [
                    {
                        title: 'Intel Core i9',
                        key: '0-0-0-0-0-0-0-0',
                        children: [
                            {
                                title: '11900T',
                                key: '0-0-0-0-0-0-0-0-0',

                            },
                            {
                                title: '11980HK',
                                key: '0-0-0-0-0-0-0-0-1',
                            },
                        ]
                    },
                    {
                        title: 'Intel Core i7',
                        key: '0-0-0-0-0-0-0-1',
                    },
                    {
                        title: 'Intel Core i5',
                        key: '0-0-0-0-0-0-0-2',
                    }
                ]

            },
            {
                title: 'Catche',
                key: '0-0-0-0-0-0-1',
                children: [
                    {
                        title: 'L1 Cache',
                        key: '0-0-0-0-0-0-1-0',

                    },
                    {
                        title: 'L2 Cache',
                        key: '0-0-0-0-0-0-1-1',
                    },
                    {
                        title: 'Smart Cache',
                        key: '0-0-0-0-0-0-1-2',
                    },
                ]
            },
            {
                title: 'Core',
                key: '0-0-0-0-0-0-2',
            }
        ]
    }];


export const allData = [
    {
        title: "Algorithm",
        key: '0',
        type: 'classification',
        children: [
            {
                title: 'Sorting Algorithms',
                key: '0-0',
                type: 'sub_classification',
                children: [
                    {
                        title: 'Merge Sort',
                        key: '0-0-0',
                        type: 'algorithm',
                        children: [
                            {
                                title: 'Implementations',
                                key: '0-0-0-0',
                                type: 'implementations',
                                children: [
                                    {
                                        title: 'Java',
                                        key: '0-0-0-0-0',
                                        type: 'implementation',
                                        children: [
                                            {
                                                title: 'Benchmarks',
                                                key: '0-0-0-0-0-0',
                                                type: 'benchmark',
                                                children: [
                                                    {
                                                        title: 'CPU',
                                                        key: '0-0-0-0-0-0-0',
                                                        type: 'benchmark_Level1',
                                                        children: [
                                                            {
                                                                title: 'Intel Core i9',
                                                                key: '0-0-0-0-0-0-0-0',
                                                                type: 'benchmark_Level2',
                                                                children: [
                                                                    {
                                                                        title: '11900T',
                                                                        key: '0-0-0-0-0-0-0-0-0',
                                                                        type: 'benchmark_Level3',

                                                                    },
                                                                    {
                                                                        title: '11980HK',
                                                                        key: '0-0-0-0-0-0-0-0-1',
                                                                        type: 'benchmark_Level3',
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                title: 'Intel Core i7',
                                                                key: '0-0-0-0-0-0-0-1',
                                                                type: 'benchmark_Level2',

                                                            },
                                                            {
                                                                title: 'Intel Core i5',
                                                                key: '0-0-0-0-0-0-0-2',
                                                                type: 'benchmark_Level2',

                                                            }
                                                        ]

                                                    },
                                                    {
                                                        title: 'Catche',
                                                        key: '0-0-0-0-0-0-1',
                                                        type: 'benchmark_Level1',
                                                        children: [
                                                            {
                                                                title: 'L1 Cache',
                                                                key: '0-0-0-0-0-0-1-0',
                                                                type: 'benchmark_Level2',
                                                            },
                                                            {
                                                                title: 'L2 Cache',
                                                                key: '0-0-0-0-0-0-1-1',
                                                                type: 'benchmark_Level2',
                                                            },
                                                            {
                                                                title: 'Smart Cache',
                                                                key: '0-0-0-0-0-0-1-2',
                                                                type: 'benchmark_Level2',
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        title: 'Core',
                                                        key: '0-0-0-0-0-0-2',
                                                        type: 'benchmark_Level1',
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        title: 'C',
                                        key: '0-0-0-0-1',
                                        type: 'implementation',
                                        children: [
                                            {
                                                title: 'Benchmarks',
                                                key: '0-0-0-0-1-0',
                                                type: 'benchmark',
                                                children: [
                                                    {
                                                        title: 'CPU',
                                                        key: '0-0-0-0-1-0-0',
                                                        type: 'benchmark_Level1',
                                                        children: [
                                                            {
                                                                title: 'Intel Core i9',
                                                                key: '0-0-0-0-1-0-0-0',
                                                                type: 'benchmark_Level2',
                                                                children: [
                                                                    {
                                                                        title: '11900T',
                                                                        key: '0-0-0-0-1-0-0-0-0',
                                                                        type: 'benchmark_Level3',

                                                                    },
                                                                    {
                                                                        title: '11980HK',
                                                                        key: '0-0-0-0-1-0-0-0-1',
                                                                        type: 'benchmark_Level3',
                                                                    },
                                                                ]
                                                            },
                                                            {
                                                                title: 'Intel Core i7',
                                                                key: '0-0-0-0-1-0-0-1',
                                                                type: 'benchmark_Level2',
                                                            },
                                                            {
                                                                title: 'Intel Core i5',
                                                                key: '0-0-0-0-1-0-0-2',
                                                                type: 'benchmark_Level2',

                                                            }
                                                        ]

                                                    },
                                                    {
                                                        title: 'Catche',
                                                        key: '0-0-0-0-1-0-1',
                                                        type: 'benchmark_Level1',

                                                        children: [
                                                            {
                                                                title: 'L1 Cache',
                                                                key: '0-0-0-0-1-0-1-0',
                                                                type: 'benchmark_Level2',


                                                            },
                                                            {
                                                                title: 'L2 Cache',
                                                                key: '0-0-0-0-1-0-1-1',
                                                                type: 'benchmark_Level2',

                                                            },
                                                            {
                                                                title: 'Smart Cache',
                                                                key: '0-0-0-0-1-0-1-2',
                                                                type: 'benchmark_Level2',

                                                            },
                                                        ]
                                                    },
                                                    {
                                                        title: 'Core',
                                                        key: '0-0-0-0-1-0-2',
                                                        type: 'benchmark_Level1',
                                                    }
                                                ]
                                            }
                                        ]
                                    },

                                ]
                            },
                            {
                                title: "Problem Instances",
                                key: '0-0-0-1',
                                type: 'problem',
                                children: [
                                    {
                                        title: "Instance 1",
                                        key: '0-0-0-1-0',
                                        type: 'problem_instance',
                                        children: [
                                            {
                                                title: "Benchmarks",
                                                key: '0-0-0-1-0-0',
                                                type: 'benchmark',
                                            },
                                        ]
                                    },
                                    {
                                        title: "Instance 2",
                                        key: '0-0-0-1-1',
                                        type: 'problem_instance',
                                        children: [
                                            {
                                                title: "Benchmarks",
                                                key: '0-0-0-1-1-0',
                                                type: 'benchmark',
                                            },
                                        ]
                                    }
                                ]
                            }
                        ],
                    },
                    {
                        title: 'Quick Sort',
                        key: '0-0-1',
                        type: 'algorithm',
                        children: [
                            {
                                title: 'Implementations',
                                key: '0-0-1-0',
                                type: 'implementations',
                                children: [

                                    { title: 'Java', key: '0-0-1-0-0', type: 'implementation' },
                                    { title: 'C', key: '0-0-1-0-1', type: 'implementation' },
                                ]
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Graph Algorithms',
                key: '0-1',
                type: 'sub_classification',
                children: [
                    { title: 'Search', key: '0-1-0',type: 'algorithm',},
                    { title: 'Single-source, Shortest Path', key: '0-1-1',type: 'algorithm',},
                    { title: 'All-pairs, Shortest Path', key: '0-1-2',type: 'algorithm',},
                ],
            },
        ]
    }

];