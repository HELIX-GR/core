//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2018.06.07 at 06:10:45 PM EEST 
//


package gr.helix.core.web.model.openaire.server;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for fundingFlatType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="fundingFlatType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="funder" type="{http://namespace.openaire.eu/oaf}funderFlatType"/>
 *         &lt;element name="funding_level_0" type="{http://namespace.openaire.eu/oaf}namedFundingLevel" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="funding_level_1" type="{http://namespace.openaire.eu/oaf}namedFundingLevel" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="funding_level_2" type="{http://namespace.openaire.eu/oaf}namedFundingLevel" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "fundingFlatType", propOrder = {
    "funder",
    "fundingLevel0",
    "fundingLevel1",
    "fundingLevel2"
})
public class FundingFlatType {

    @XmlElement(required = true)
    protected FunderFlatType funder;
    @XmlElement(name = "funding_level_0")
    protected List<NamedFundingLevel> fundingLevel0;
    @XmlElement(name = "funding_level_1")
    protected List<NamedFundingLevel> fundingLevel1;
    @XmlElement(name = "funding_level_2")
    protected List<NamedFundingLevel> fundingLevel2;

    /**
     * Gets the value of the funder property.
     * 
     * @return
     *     possible object is
     *     {@link FunderFlatType }
     *     
     */
    public FunderFlatType getFunder() {
        return funder;
    }

    /**
     * Sets the value of the funder property.
     * 
     * @param value
     *     allowed object is
     *     {@link FunderFlatType }
     *     
     */
    public void setFunder(FunderFlatType value) {
        this.funder = value;
    }

    /**
     * Gets the value of the fundingLevel0 property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the fundingLevel0 property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getFundingLevel0().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link NamedFundingLevel }
     * 
     * 
     */
    public List<NamedFundingLevel> getFundingLevel0() {
        if (fundingLevel0 == null) {
            fundingLevel0 = new ArrayList<NamedFundingLevel>();
        }
        return this.fundingLevel0;
    }

    /**
     * Gets the value of the fundingLevel1 property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the fundingLevel1 property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getFundingLevel1().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link NamedFundingLevel }
     * 
     * 
     */
    public List<NamedFundingLevel> getFundingLevel1() {
        if (fundingLevel1 == null) {
            fundingLevel1 = new ArrayList<NamedFundingLevel>();
        }
        return this.fundingLevel1;
    }

    /**
     * Gets the value of the fundingLevel2 property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the fundingLevel2 property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getFundingLevel2().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link NamedFundingLevel }
     * 
     * 
     */
    public List<NamedFundingLevel> getFundingLevel2() {
        if (fundingLevel2 == null) {
            fundingLevel2 = new ArrayList<NamedFundingLevel>();
        }
        return this.fundingLevel2;
    }

}