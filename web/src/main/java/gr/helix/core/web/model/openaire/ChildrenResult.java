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
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlElementRefs;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for childrenResult complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="childrenResult">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;choice maxOccurs="unbounded">
 *         &lt;element name="title" type="{http://namespace.openaire.eu/oaf}classedSchemedElement" maxOccurs="unbounded"/>
 *         &lt;element name="dateofacceptance" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="publisher" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="resulttype" type="{http://namespace.openaire.eu/oaf}classedSchemedElement"/>
 *       &lt;/choice>
 *       &lt;attribute name="objidentifier" use="required" type="{http://www.w3.org/2001/XMLSchema}anySimpleType" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "childrenResult", propOrder = {
    "titleOrDateofacceptanceOrPublisher"
})
public class ChildrenResult {

    @XmlElementRefs({
        @XmlElementRef(name = "dateofacceptance", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "resulttype", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "title", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "publisher", type = JAXBElement.class, required = false)
    })
    protected List<JAXBElement<?>> titleOrDateofacceptanceOrPublisher;
    @XmlAttribute(name = "objidentifier", required = true)
    @XmlSchemaType(name = "anySimpleType")
    protected String objidentifier;

    /**
     * Gets the value of the titleOrDateofacceptanceOrPublisher property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the titleOrDateofacceptanceOrPublisher property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getTitleOrDateofacceptanceOrPublisher().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link ClassedSchemedElement }{@code >}
     * {@link JAXBElement }{@code <}{@link ClassedSchemedElement }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * 
     * 
     */
    public List<JAXBElement<?>> getTitleOrDateofacceptanceOrPublisher() {
        if (titleOrDateofacceptanceOrPublisher == null) {
            titleOrDateofacceptanceOrPublisher = new ArrayList<JAXBElement<?>>();
        }
        return this.titleOrDateofacceptanceOrPublisher;
    }

    /**
     * Gets the value of the objidentifier property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getObjidentifier() {
        return objidentifier;
    }

    /**
     * Sets the value of the objidentifier property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setObjidentifier(String value) {
        this.objidentifier = value;
    }

}