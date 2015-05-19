/**
 * Created on 19.05.2015.
 * факт.01: режимы надо загружать
 * факт.02: у режима составные части: цели, функции, компараторы
 * факт.03: под составными частями лежат стереотипы
 *
 * факт.04: входные данные: ссылка на конфиг и имя режима
 * факт.05: выходные данные: созданный и связанный набор объектов
 *
 * факт.06: у целей могут быть вложенные цели
 */
var inDataSample = {
    key: 'string',
    config: 'concept config object',
    ou: 'ou object',
    root: 'root config',
    // с уточнённым подходом размежевания интерфейсами
    rootI: {
        getStereotypeBy: 'function(key)'
    }
};

var outDataSample = {
    targetVector: ko.observableArray([{
        description: 'from config',
        f: 'целевая функция',
        c: 'comparator',
        subVector: 'такая-же структура, для вложенной цели'
    }]),
    stereotypes: {
        map: {},
        list: ko.observableArray([])
    },
    functions: {}
};

define([
    'SI/m/Stereotypes',
    'SI/m/i/batchLoader'
], function (Stereotypes, batchLoader) {

    var
        mode,
        stereotypeUrls,
        context = {
            initMode: function () {
                mode = {
                    targetVector: ko.observableArray([]),
                    stereotypes: ko.observableArray([]),
                    functions: ko.observableArray([])
                };

                stereotypeUrls = [];
            },
            findConfigItemBy: function (key, section) {
                for (var i in section) {
                    if (section[i].key == key)
                        return section[i];
                }
                throw new Error("Key: {0} not found".format(key));
            },
            buildUrlsMapByTarget: function (config, target, map) {
                var
                    fs = context.findConfigItemBy(target.function, config.functions),
                    cs = context.findConfigItemBy(target.comparator, config.stereotypes);

                fs.params.concat(cs.params).forEach(function (key) {
                    map[key] = context.findConfigItemBy(key, config.stereotypes);
                });
            },
            getStereotypes: function (names, stereotypes) {
                //var
            }
        };

    function loadMode(params) {
        with (context) with (params) {
            var
                modeConfig = findConfigItemBy(key, config.modes),
                stereotypesMap = {};

            initMode();

            modeConfig.vector.forEach(function (target) {
                stereotypeUrls = buildUrlsMapByTarget(config, target, stereotypesMap);
            });
        }
    };
    loadMode.contextForTests = context;
    return loadMode;
});
