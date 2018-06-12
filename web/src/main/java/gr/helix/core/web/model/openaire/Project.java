//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2018.06.07 at 06:10:45 PM EEST 
//


package gr.helix.core.web.model.openaire;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlElementRefs;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;choice maxOccurs="unbounded">
 *         &lt;element name="code" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="contactfullname" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="contactfax" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="contactphone" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="contactemail" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="acronym" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="title" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="startdate" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="enddate" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="callidentifier" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="ecsc39" type="{http://namespace.openaire.eu/oaf}boolOrEmptyType"/>
 *         &lt;element name="ecarticle29_3" type="{http://namespace.openaire.eu/oaf}boolOrEmptyType"/>
 *         &lt;element name="oamandatepublications" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="contracttype" type="{http://namespace.openaire.eu/oaf}optionalClassedSchemedElement"/>
 *         &lt;element name="subjects" type="{http://namespace.openaire.eu/oaf}optionalClassedSchemedElement"/>
 *         &lt;element name="fundingtree" type="{http://namespace.openaire.eu/oaf}fundingTreeType"/>
 *         &lt;element name="websiteurl" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="keywords" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="duration" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="originalId" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="collectedfrom" type="{http://namespace.openaire.eu/oaf}namedIdElement"/>
 *         &lt;element name="pid" type="{http://namespace.openaire.eu/oaf}optionalClassedSchemedElement"/>
 *         &lt;element name="datainfo" type="{http://namespace.openaire.eu/oaf}datainfoType"/>
 *         &lt;element name="rels" type="{http://namespace.openaire.eu/oaf}relsType"/>
 *         &lt;element name="children">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *       &lt;/choice>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "codeOrContactfullnameOrContactfax"
})
@XmlRootElement(name = "project")
public class Project {

    @XmlElementRefs({
        @XmlElementRef(name = "acronym", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "contracttype", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "contactfullname", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "contactphone", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "keywords", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "duration", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "children", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "websiteurl", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "collectedfrom", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "rels", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "enddate", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "oamandatepublications", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "contactemail", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "startdate", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "fundingtree", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "originalId", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "pid", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "callidentifier", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "ecarticle29_3", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "title", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "ecsc39", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "datainfo", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "contactfax", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "subjects", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "code", type = JAXBElement.class, required = false)
    })
    protected List<JAXBElement<?>> codeOrContactfullnameOrContactfax;

    /**
     * Gets the value of the codeOrContactfullnameOrContactfax property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the codeOrContactfullnameOrContactfax property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCodeOrContactfullnameOrContactfax().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link OptionalClassedSchemedElement }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link Project.Children }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link NamedIdElement }{@code >}
     * {@link JAXBElement }{@code <}{@link RelsType }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link Boolean }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link FundingTreeType }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link OptionalClassedSchemedElement }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link DatainfoType }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link OptionalClassedSchemedElement }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * 
     * 
     */
    public List<JAXBElement<?>> getCodeOrContactfullnameOrContactfax() {
        if (codeOrContactfullnameOrContactfax == null) {
            codeOrContactfullnameOrContactfax = new ArrayList<JAXBElement<?>>();
        }
        return this.codeOrContactfullnameOrContactfax;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "content"
    })
    public static class Children {

        @XmlValue
        protected String content;

        /**
         * Gets the value of the content property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getContent() {
            return content;
        }

        /**
         * Sets the value of the content property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setContent(String value) {
            this.content = value;
        }

    }

}
