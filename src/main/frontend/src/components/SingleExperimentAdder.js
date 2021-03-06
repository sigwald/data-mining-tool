import React, {PropTypes} from "react";
import ListOfElements from "./list-of-elements/ListOfElements";
import Divider from "material-ui/Divider";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import AdvancedTextField from "./AdvancedTextField";
import {Col, Row} from "react-grid-system";

const style = {
    oneOfTwoInputFields: {
        width: "90%"
    },
    oneOfFourInputFields: {
        width: "78%"
    },
    noPadding: {
        padding: "0px 0px 0px 0px"
    },
    divider: {
        marginTop: "10px"
    }
};

const SingleExperimentAdder = ({orderNum, experiments, inputFields}) => {

    const title = `New experiment ${orderNum}`;

    const handleSelectChange = (event, index, value) => {
        const [name, elem] = value.split(":");
        console.log("name: ", name, "value: ", elem);
        inputFields.changeSelectField(name, elem);
    };

    const renderOptionalFields = (inputFields) => {


        if (inputFields.mode === "text_from_tags")
            return <AdvancedTextField placeHolder={""}
                                      pattern={"path"}
                                      label={"tag name"}
                                      fieldName={"tagName"}
                                      value={inputFields.tagName}
                                      onChangeEvent={inputFields.changeEvent}
                                      style={style.oneOfTwoInputFields}/>;
        if (inputFields.mode === "ngrams")
            return <AdvancedTextField placeHolder={""}
                                      pattern={"not_empty"}
                                      type="number"
                                      label={"ngram size"}
                                      fieldName={"nGramSize"}
                                      value={inputFields.nGramSize}
                                      onChangeEvent={inputFields.changeEvent}
                                      style={style.oneOfTwoInputFields}/>;

        if (inputFields.mode === "tag_stat")
            return <AdvancedTextField placeHolder={""}
                                      pattern={"not_empty"}
                                      type="number"
                                      label={"round to decimal places"}
                                      fieldName={"roundToDecimalPlaces"}
                                      value={inputFields.roundToDecimalPlaces}
                                      onChangeEvent={inputFields.changeEvent}
                                      style={style.oneOfTwoInputFields}/>;

    };

    const renderThresHoldOrRatio = (inputFields) => {
        if (inputFields.mode === "tag_stat") {
            return <AdvancedTextField placeHolder={""}
                                      pattern={"path"}
                                      label={"normal.ratio"}
                                      fieldName={"normalizeRatio"}
                                      value={inputFields.normalizeRatio}
                                      onChangeEvent={inputFields.changeEvent}
                                      style={style.oneOfFourInputFields}/>;
        }
        else if (inputFields.mode !== "join" && inputFields.mode !== "tag_stat") {
            return <AdvancedTextField placeHolder={""}
                                      pattern={"path"}
                                      label={"IDF_Threshold"}
                                      fieldName={"IDF_Treshold"}
                                      value={inputFields.IDF_Treshold}
                                      onChangeEvent={inputFields.changeEvent}
                                      style={style.oneOfFourInputFields}
            />
        }
    };

    const renderTFTypeIDFType = (inputFields) => {
        if (inputFields.mode !== "join" && inputFields.mode !== "tag_stat") {
            return (
                <div style={style.noPadding}>
                    <Col xs={12} md={6} style={style.noPadding}>
                        <AdvancedTextField placeHolder={""}
                                           pattern={"path"}
                                           label={"IDF_Type"}
                                           fieldName={"IDF_Type"}
                                           value={inputFields.IDF_Type}
                                           onChangeEvent={inputFields.changeEvent}
                                           style={{width: "60%"}}
                        />
                    </Col>
                    <Col xs={12} md={6} style={style.noPadding}>
                        <AdvancedTextField placeHolder={""}
                                           pattern={"path"}
                                           label={"TF_Type"}
                                           fieldName={"TF_Type"}
                                           value={inputFields.TF_Type}
                                           onChangeEvent={inputFields.changeEvent}
                                           style={{width: "60%"}}
                        />
                    </Col>
                </div>);
        }
    };

    const featuresByCategory = (inputFields, position) => {
        if (position === "right" && (inputFields.mode === "text_main" || inputFields.mode === "tag_stat"))
            return <AdvancedTextField placeHolder={""}
                                      pattern={"path"}
                                      label={"features by category"}
                                      type="number"
                                      fieldName={"featuresByCategory"}
                                      value={inputFields.featuresByCategory}
                                      onChangeEvent={inputFields.changeEvent}
                                      style={style.oneOfTwoInputFields}
            />;

        if (position === "left" && (inputFields.mode === "ngrams" || inputFields.mode === "text_from_tags"))
            return <AdvancedTextField placeHolder={""}
                                      pattern={"path"}
                                      label={"features by category"}
                                      type="number"
                                      fieldName={"featuresByCategory"}
                                      value={inputFields.featuresByCategory}
                                      onChangeEvent={inputFields.changeEvent}
                                      style={style.oneOfTwoInputFields}
            />
    };

    const renderNotInJoin = (inputFields, what) => {
        if (inputFields.mode !== "join") {
            if (what === "type")
                return (
                    <SelectField
                        floatingLabelText="Type"
                        value={"type:" + inputFields.type}
                        onChange={ handleSelectChange}
                        style={{width: "100%"}}
                    >
                        <MenuItem value={"type:binomial"} primaryText="binomial"/>
                        <MenuItem value={"type:real"} primaryText="real"/>
                    </SelectField>);
            if (what === "dataset")
                return (
                    <AdvancedTextField placeHolder={""}
                                       pattern={"path"}
                                       label={"dataset"}
                                       fieldName={"dataSetName"}
                                       value={inputFields.dataSetName}
                                       onChangeEvent={inputFields.changeEvent}
                                       style={style.oneOfTwoInputFields}
                    />
                );
        }
    };

    const renderInJoin = (inputFields, experiments) => {
        if (inputFields.mode === "join") {
            return (
                <ListOfElements {...experiments}/>
            );
        }
    };

    return (
        <div>
            <h2>
                {title}
            </h2>
            <Row>
                <Col xs={12} md={6}>
                    <Row>
                        <Col xs={12} md={5}>
                            <AdvancedTextField placeHolder={""}
                                               pattern={"not_empty"}
                                               label={"name"}
                                               fieldName={"name"}
                                               value={inputFields.name}
                                               onChangeEvent={inputFields.changeEvent}
                                               style={{width: "71%"}}
                            />
                        </Col>
                        <Col xs={12} md={7}>
                            <SelectField
                                floatingLabelText="Mode"
                                value={"mode:" + inputFields.mode}
                                onChange={handleSelectChange}
                                style={{width: "90%"}}
                            >
                                <MenuItem value={"mode:text_main"} primaryText="text_main"/>
                                <MenuItem value={"mode:text_from_tags"} primaryText="text_tag"/>
                                <MenuItem value={"mode:ngrams"} primaryText="ngram"/>
                                <MenuItem value={"mode:tag_stat"} primaryText="tag_stat"/>
                                <MenuItem value={"mode:join"} primaryText="join"/>
                            </SelectField>
                        </Col>
                    </Row>

                    <AdvancedTextField placeHolder={""}
                                       pattern={"path"}
                                       label={"description"}
                                       fieldName={"description"}
                                       value={inputFields.description}
                                       onChangeEvent={inputFields.changeEvent}
                                       style={style.oneOfTwoInputFields}
                    />

                    <Row>
                        <Col xs={12} md={6}>
                            {renderNotInJoin(inputFields, "type")}
                        </Col>
                        <Col xs={12} md={6}>
                            {renderThresHoldOrRatio(inputFields)}
                        </Col>
                    </Row>
                    {featuresByCategory(inputFields, "left")}
                </Col>
                <Col xs={12} md={6}>
                    {renderNotInJoin(inputFields, "dataset")}
                    {renderOptionalFields(inputFields)}
                    {renderTFTypeIDFType(inputFields)}
                    {featuresByCategory(inputFields, "right")}
                    {renderInJoin(inputFields, experiments)}
                </Col>
                <Row>
                    <Col xs={12} md={12}>
                        <Divider style={style.divider}/>
                    </Col>
                </Row>
            </Row>
        </div>
    );
};

SingleExperimentAdder.propTypes = {
    orderNum: PropTypes.number.isRequired,
    experiments: PropTypes.object.isRequired,
    inputFields: PropTypes.object.isRequired,
};

export default SingleExperimentAdder;
