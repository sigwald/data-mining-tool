import Immutable from "immutable";

export const initialState = Immutable.fromJS({
    import: {
        route: "/import",
        displayName: "Import Blacklist",
        isOn: false,
        userName: "postgres",
        password: "postgresql",
        dbName: "Website_Classification",
        port: 5432,
        cwd: "C:\\DataMining\\experiment_data\\",
        blacklists: [
            {
                listName: "Shalla Security Blacklist",
                folderName: "\\blacklists\\shalla\\",
                website: "http://www.shallalist.de/",
                key: 1
            },
            {
                listName: "URLBlacklist",
                folderName: "\\blacklists\\ubl\\",
                website: "http://urlblacklist.com/",
                key: 2
            }
        ]
    },
    download: {
        route: "/download",
        displayName: "Download HTML",
        isOn: false,
        categories: ["medical", "chat", "news", "pets"],
        downloadsPerCategory: 200,
        connectTimeout: 5000,
        readTimeout: 5000,
        threadsNumber: 50
    },
    extract: {
        route: "/extract",
        displayName: "Extract features",
        isOn: false,
        isTextMain: true,
        isTextFromTags: true,
        isNgrams: false,
        isTagStat: false,
        categories: ["medical", "chat", "news", "pets"],
        tagsWithText: ["h1", "h2", "h3", "title"],
        maxNGramSize: 6,
        tagsToSkip: ["html", "head", "title", "body"]
    },
    dataSplit: {
        route: "/split",
        displayName: "Split data set",
        isOn: false,
        param: [
            {
                dataSetName: "set_1",
                description: "large data set",
                categories: ["medical", "religion", "alcohol", "shopping"],
                partitionLearn: 0.8,
                lang: "en",
                minTextLength: 500,
                maxTextLength: 5000,
                websitesPerCategory: 2000,
            },
            {
                dataSetName: "set_2",
                description: "small data set",
                categories: ["religion", "alcohol", "adult"],
                partitionLearn: 0.7,
                lang: "en",
                minTextLength: 500,
                maxTextLength: 5000,
                websitesPerCategory: 1000
            }
        ]
    },
    prepare: {
        route: "/prepare",
        displayName: "Create and prepare experiments",
        isOn: false,
        stopWordsPath: "\\stopwords.dat",
        amlPath: "\\amls\\",
        experiments: [
            {
                name: "exp_6",
                description: "text experiment 1",
                dataSetName: "set_1",
                mode: "text_main",
                type: "binomial",
                IDF_Treshold: 0.001,
                IDF_Type: "M",
                TF_Type: "S",
                featuresByCategory: 50
            },
            {
                name: "exp_7",
                description: "text experiment 2",
                dataSetName: "set_2",
                mode: "text_main",
                type: "binomial",
                IDF_Treshold: 0.001,
                IDF_Type: "M",
                TF_Type: "S",
                featuresByCategory: 50
            },
            {
                name: "exp_8",
                description: "text from tag experiment 1",
                dataSetName: "set_2",
                mode: "text_from_tags",
                type: "binomial",
                tagName: "h1",
                IDF_Treshold: 0.001,
                IDF_Type: "M",
                TF_Type: "S",
                featuresByCategory: 50
            },
            {
                name: "exp_9",
                description: "text from tag experiment 2",
                dataSetName: "set_1",
                mode: "text_from_tags",
                type: "binomial",
                tagName: "h2",
                IDF_Treshold: 0.001,
                IDF_Type: "M",
                TF_Type: "S",
                featuresByCategory: 50
            },
            {
                name: "exp_10",
                description: "ngram experiment 1",
                dataSetName: "set_2",
                mode: "ngrams",
                type: "binomial",
                nGramSize: 3,
                IDF_Treshold: 0.001,
                IDF_Type: "M",
                TF_Type: "S",
                featuresByCategory: 50
            },
            {
                name: "exp_13",
                description: "tag stat",
                dataSetName: "set_2",
                mode: "tag_stat",
                type: "real",
                roundToDecimalPlaces: 3,
                normalizeRatio: 0.95,
                featuresByCategory: 50
            },
            {
                name: "exp_14",
                description: "tag stat",
                dataSetName: "set_1",
                mode: "tag_stat",
                type: "real",
                roundToDecimalPlaces: 3,
                normalizeRatio: 0.95,
                featuresByCategory: 50
            },
        ]
    },
    join: {
        route: "/join",
        displayName: "Join experiments",
        isOn: false,
        experiments: ["exp_7", "exp_8", "exp_10", "exp_13"]
    }
});

export const connectionInitialState = Immutable.fromJS({
        started: false,
        status: "Ready",
        percentsProgress: 0,
        error: null,
        activeTab: 0,
        formActive: 0,
    }
);